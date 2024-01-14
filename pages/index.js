// pages/index.js
// This is the home page of the application. It contains the game logic, state management and UI components for the game.
import React, { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';
import Sparkle from '../components/Sparkle';
import NavigationButtons from '../components/NavigationButtons';
import { getFirebaseFirestore } from '../app/src/firebase';
import useSound from 'use-sound';
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import GameOver from '../components/GameOver';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab, Spinner } from "@nextui-org/react";
import StrikeIndicator from '../components/StrikeIndicator';
import ChatWithScript from '../components/ChatWithScript';
import Head from 'next/head';

export default function Home() {
  const { user, loading: isAuthLoading, setUser } = useAuth();
  const [userId, setUserId] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [question, setQuestion] = useState({ codeSnippet: null, options: [] });
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [correctAnswerIndex] = useState(0);
  const [showScoreSparkle, setShowScoreSparkle] = useState(false);
  const db = getFirebaseFirestore();
  const [gameId, setGameId] = useState(null);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [isFirebaseUpdated, setIsFirebaseUpdated] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [learningLevel, setLearningLevel] = useState('intermediate');
  const [selectedScript, setSelectedScript] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [leaderboardName, setLeaderboardName] = useState(null);
  const [customInstructions, setCustomInstructions] = useState({});
  const [capExceeded, setCapExceeded] = useState(false);
  const [formMode, setFormMode] = useState('guest');
  const [playGameStart] = useSound('/sounds/gameStart.wav');
  const [playGameOver] = useSound('/sounds/gameOver.wav');

  const strikeLimit = 2;

  // Conversation starters
  const conversationStarters = ["Give me a hint", "Decode this snippet", "Explain it like I'm 5"];

  const handleGameModeSelect = mode => {
    playGameStart();
    setGameMode(mode);
    setGameId(uuidv4());
    handleCodeSnippetFetch([]);
  };

  const handleChatWithTutor = (script) => {
    setSelectedScript(script);
    setShowChatWindow(true);
  };

  const handleNewChat = () => {
    setSelectedScript(null);
  };

  const resetAuthFormMode = () => {
    setFormMode('guest');
  };

  const handleMessageSubmit = async (messageToSend, updatedChatHistory, selectedScript) => {
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/chatWithScript`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script: question.codeSnippet,
          userMessage: messageToSend,
          chatHistory: updatedChatHistory,
          learningLevel,
          userId: user.uid,
          customInstructions
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const newChatHistory = [...updatedChatHistory, { role: 'assistant', content: data.response }];
      setChatHistory(newChatHistory);
      return newChatHistory;
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };

  const handleAnswerSubmit = async (answerIndex, isCorrect) => {
    setIsFirebaseUpdated(false);

    const answer = question.options[answerIndex];
    const correctAnswer = question.options[correctAnswerIndex];
    let gameOver = false;

    // Update streaks and strikes based on whether the answer is correct
    if (isCorrect) {
      setCurrentStreak(prev => prev + 1);
    } else {
      if (currentStreak > longestStreak) setLongestStreak(currentStreak);
      setStrikes(prev => prev + 1);
      setIncorrectAnswers(prev => [...prev, { question: question.codeSnippet, answer, correctAnswer }]);
      setCurrentStreak(0);
      if (strikes + 1 >= strikeLimit) {
        gameOver = true;
        playGameOver();
      }
    }

    // Update conversation history and fetch the next question if the game is not over
    const newConversationHistory = [...conversationHistory, { role: 'user', content: answer }];
    setConversationHistory(newConversationHistory);
    if (!gameOver) await handleCodeSnippetFetch(newConversationHistory);

    // Update game stats
    setQuestionsAnswered(prev => prev + 1);
    setIsGameOver(gameOver);

    // Log the answered question in Firestore
    const questionId = uuidv4();
    const gameDoc = doc(db, 'users', user.uid, 'games', gameId);
    await setDoc(gameDoc, { timestamp: new Date(), score: 0, longestStreak: 0 }, { merge: true });
    const questionDoc = doc(gameDoc, 'history', questionId);
    await setDoc(questionDoc, {
      question: question.codeSnippet,
      answer,
      isCorrect,
      gameId,
      timestamp: new Date(),
      strikes,
      strikeLimit,
    }).catch(() => alert('Failed to log answer. Please try again.'));

    setIsFirebaseUpdated(true);
  };

  const handleSkipSubmit = async () => {
    const newConversationHistory = [...conversationHistory, { role: 'user', content: 'Skip' }];
    setConversationHistory(newConversationHistory);

    // Only fetch the next question if the game has not ended
    if (!isGameOver) {
      await handleCodeSnippetFetch(newConversationHistory);
    }
  };

  const handleCodeSnippetFetch = async (conversationHistory) => {
    setIsQuestionsLoading(true); // Set isQuestionsLoading to true before fetching a new question
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet?gameMode=${gameMode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationHistory, learningLevel, customInstructions }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data.conversationHistory)) {
        const responseText = data.conversationHistory[data.conversationHistory.length - 1].content;
        const codeSnippet = responseText.match(/```(.|\n)*?```/)?.[0] || '';
        let options = responseText.match(/A\) .*\nB\) .*/)?.[0].split('\n') || [];
        // comment the line add the "A) " and "B) " prefixes
        options = options.map(option => option.slice(3));
        setQuestion({ codeSnippet, options });
        if (conversationHistory && (conversationHistory.length === 0 || responseText !== conversationHistory[conversationHistory.length - 1].content)) {
          setConversationHistory([...conversationHistory, { role: 'assistant', content: responseText }]);
        }
      }
    } catch (error) {
      alert('Failed to fetch code snippet. Please try again.');
    } finally {
      setIsQuestionsLoading(false);
    }
  };

  const resetGame = () => {
    setGameMode(null);
    setQuestion({ codeSnippet: null, options: [] });
    setScore(0);
    setQuestionsAnswered(0);
    setConversationHistory([]);
    setIsQuestionsLoading(false);
    setCurrentStreak(0);
    setLongestStreak(0);
    setStrikes(0);
    setIncorrectAnswers([]);
    setIsGameOver(false);
    setChatHistory([]);
    setSelectedScript(null);
  };

  const confirmEndGame = () => {
    resetGame();
    setShowEndGameModal(false);
  };

  const cancelEndGame = () => {
    setShowEndGameModal(false);
  };

  const toggleChatWindow = () => {
    setShowChatWindow(prevState => !prevState);
  };

  const updateLearningLevelInFirebase = async (level) => {
    if (user && db) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { learningLevel: level });
        setLearningLevel(level);
      } catch (error) {
        alert('Failed to update learning level. Please try again.');
      }
    }
  };

  const handleUserUpdate = async (user) => {
    setUser(user);
    setUserId(user?.uid || null);

    // Fetch leaderboardName and capExceeded from Firestore for all users
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setLeaderboardName(userData.leaderboardName);
        console.log("index.js leaderboardName state:", userData.leaderboardName); // Added log
        setCapExceeded(userData.capExceeded || false);
      }
    }
  };

  useEffect(() => {
    handleUserUpdate(user);
  }, [user]);

  useEffect(() => {
    if (score > 0) {
      setShowScoreSparkle(true);
      setTimeout(() => setShowScoreSparkle(false), 1000);
    }
  }, [score]);

  useEffect(() => {
    let unsubscribe = () => {};

    if (user && db) {
      const userDocRef = doc(db, 'users', user.uid);
      unsubscribe = onSnapshot(userDocRef, (doc) => {
        const userData = doc.data();
        if (userData) {
          setCapExceeded(userData.capExceeded || false);
        }
      });
    }

    // Clean up the listener when the component unmounts or userId/db changes
    return () => unsubscribe();
  }, [user, db]); // Use user from useAuth hook

  useEffect(() => {
    if (user && db) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          if (userData) {
            if (userData.learningLevel) {
              setLearningLevel(userData.learningLevel);
            }
            // Fetch customInstructions and pass it to the state or a variable
            const customInstructions = userData.customInstructions || {};
            setCustomInstructions(customInstructions);
          }
        } catch (error) {
          alert('Failed to fetch user data. Please try again.');
        }
      };

      fetchUserData();
    }
  }, [user, db]);

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-custom-gradient">
      <Head>
        <title key="title">Play DecodeMe!</title>
        <meta key="description" name="description" content="Play DecodeMe! and improve your coding skills!" />
        <meta key="og:title" property="og:title" content="Play DecodeMe!" />
        <meta key="og:description" property="og:description" content="Play DecodeMe! and improve your coding skills!" />
        <meta key="og:image" property="og:image" content="https://decodeme.app/images/shareimage.png" />
        <meta key="og:url" property="og:url" content="https://decodeme.app" />
      </Head>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-200 to-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <NavigationButtons resetGame={resetGame} resetAuthFormMode={resetAuthFormMode} question={question} onSkipSubmit={handleSkipSubmit} gameMode={gameMode} isGameOver={isGameOver} />
          {question.codeSnippet && <ChatWithScript isOpen={showChatWindow} onClose={toggleChatWindow} codeSnippet={question.codeSnippet} selectedScript={selectedScript} db={db} learningLevel={learningLevel} onLearningLevelChange={updateLearningLevelInFirebase} chatHistory={chatHistory} setChatHistory={setChatHistory} handleMessageSubmit={handleMessageSubmit} conversationStarters={conversationStarters} onNewChat={handleNewChat} capExceeded={capExceeded || false} />}
          <h1 className="text-2xl font-medium mb-5 text-center text-gray-900">
            DecodeMe! Score:{" "}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                {showScoreSparkle && <Sparkle />}
              </div>
              {score}
            </div>
            {gameMode && <div className="flex justify-center"><StrikeIndicator strikes={strikes} limit={strikeLimit} /></div>}
          </h1>
          <div className="auth-container" style={isAuthLoading || !user ? { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } : {}}>
            {isAuthLoading ? <Spinner label="Initializing..." color="Default" /> : (!user ? <Auth onUserAuth={handleUserUpdate} onLeaderboardNameSet={setLeaderboardName} formMode={formMode} setFormMode={setFormMode} /> : 
            !gameMode ? (
              <>
                <Tabs
                  aria-label="Learning Level"
                  selectedKey={learningLevel}
                  onSelectionChange={updateLearningLevelInFirebase}
                >
                  <Tab key="beginner" title="Beginner" />
                  <Tab key="intermediate" title="Regular" />
                  <Tab key="expert" title="Expert" />
                </Tabs>
                <GameModeSelection onGameModeSelect={handleGameModeSelect} />
              </>
            ) :
              isGameOver && user && gameId && isFirebaseUpdated ?
                <>
                  <GameOver
                    score={score}
                    questionsAnswered={questionsAnswered}
                    conversationHistory={conversationHistory}
                    gameId={gameId}
                    userId={user.uid}
                    db={db}
                    longestStreak={longestStreak}
                    incorrectAnswers={incorrectAnswers}
                    currentStreak={currentStreak}
                    handleChatWithTutor={handleChatWithTutor}
                    leaderboardName={leaderboardName}
                    user={user}
                    learningLevel={learningLevel}
                  />
                </> :
                <>
                  <CodeSnippetDisplay codeSnippet={question.codeSnippet} loading={isQuestionsLoading} />
                  <UserAnswerInput
                    options={question.options}
                    onAnswerSubmit={handleAnswerSubmit}
                    disabled={isQuestionsLoading}
                    correctAnswerIndex={correctAnswerIndex}
                    setScore={setScore}
                  />
                </>)}
          </div>
          {showEndGameModal && (
            <Modal isOpen={showEndGameModal} onClose={cancelEndGame}>
              <ModalContent>
                <ModalHeader>End Game</ModalHeader>
                <ModalBody>Are you sure you want to end the current game?</ModalBody>
                <ModalFooter>
                  <Button color="priåmary" onClick={cancelEndGame}>Cancel</Button>
                  <Button color="danger" onClick={confirmEndGame}>End Game</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </div>
      </div>
      <footer className="text-center p-4 absolute bottom-0 w-full text-center text-gray-500 text-sm">
        Made by <a href="https://github.com/ryanmio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 hover:underline">Ryan</a>
      </footer>
    </div>
  );
}
