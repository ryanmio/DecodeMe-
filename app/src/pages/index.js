// app/src/pages/index.js
// This is the main page of the app. It handles user authentication, game mode selection, 
// question fetching and answering, and game over conditions.

import React, { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';
import Sparkle from '../components/Sparkle';
import NavigationButtons from '../components/NavigationButtons';
import { getFirebaseAuth, getFirebaseFirestore } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import GameOver from '../components/GameOver';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab } from "@nextui-org/react";
import StrikeIndicator from '../components/StrikeIndicator';
import ChatWithScript from '../components/ChatWithScript';

export default function Home() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [question, setQuestion] = useState({ codeSnippet: null, options: [] });
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const questionLimit = 20;
  const strikeLimit = 1;

  const handleUserUpdate = (user) => {
    setUser(user);
    setUserId(user?.uid || null);
  };

  const handleUserAuth = (user) => {
    handleUserUpdate(user);
  };

  const handleGameModeSelect = mode => {
    setGameMode(mode);
    setGameId(uuidv4());
    handleCodeSnippetFetch([]);
  };

  const handleAnswerSubmit = async (answerIndex, isCorrect) => {
    setIsFirebaseUpdated(false);
    const answer = question.options[answerIndex];
    const correctAnswer = question.options[correctAnswerIndex];

    let gameOver = false;

    if (isCorrect) {
      setCurrentStreak(prev => prev + 1);
    } else {
      if (currentStreak > longestStreak) {
        setLongestStreak(currentStreak);
      }
      setStrikes(prev => prev + 1);
      setIncorrectAnswers(prev => [...prev, { question: question.codeSnippet, answer, correctAnswer }]);
      setCurrentStreak(0);
      if (strikes + 1 >= strikeLimit) {
        gameOver = true;
      }
    }

    const newConversationHistory = [...conversationHistory, { role: 'user', content: answer }];
    setConversationHistory(newConversationHistory);

    // Only fetch the next question if the game has not ended
    if (!gameOver) {
      await handleCodeSnippetFetch(newConversationHistory);
    }

    setQuestionsAnswered(prev => prev + 1);
    setIsGameOver(gameOver);

    // Log the answered question in Firestore
    const auth = await getFirebaseAuth();
    const questionId = uuidv4();

    // Create a reference to the 'game' document
    const gameDoc = doc(db, 'users', userId, 'games', gameId);

    // Set the 'timestamp' field in the 'game' document
    await setDoc(gameDoc, { timestamp: new Date() }, { merge: true });

    // Create a reference to the 'history' document
    const questionDoc = doc(gameDoc, 'history', questionId);

    await setDoc(questionDoc, {
      question: question.codeSnippet,
      answer,
      isCorrect,
      gameId,
      timestamp: new Date(),
      strikes,
      strikeLimit,
    }).catch((error) => {
      console.error('Failed to log answer:', error);
    });

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
    setIsLoading(true);
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet?gameMode=${gameMode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationHistory }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data.conversationHistory)) {
        const responseText = data.conversationHistory[data.conversationHistory.length - 1].content;
        const codeSnippet = responseText.match(/```(.|\n)*?```/)?.[0] || '';
        let options = responseText.match(/A\) .*\nB\) .*/)?.[0].split('\n') || [];
        // Uncomment the line below to remove the "A) " and "B) " prefixes
        options = options.map(option => option.slice(3));
        setQuestion({ codeSnippet, options });
        if (conversationHistory && (conversationHistory.length === 0 || responseText !== conversationHistory[conversationHistory.length - 1].content)) {
          setConversationHistory([...conversationHistory, { role: 'assistant', content: responseText }]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch code snippet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setGameMode(null);
    setQuestion({ codeSnippet: null, options: [] });
    setScore(0);
    setQuestionsAnswered(0);
    setConversationHistory([]);
    setIsLoading(false);
    setCurrentStreak(0);
    setLongestStreak(0);
    setStrikes(0);
    setIncorrectAnswers([]);
    setIsGameOver(false);
  };

  const handleHomeClick = () => {
    if (questionsAnswered >= 1) {
      setShowEndGameModal(true);
    } else {
      resetGame();
    }
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
    console.log('updateLearningLevelInFirebase called with level:', level);
    if (userId && db) {
      try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, { learningLevel: level });
        setLearningLevel(level);
        console.log(`Learning level updated to ${level}`);
      } catch (error) {
        console.error('Failed to update learning level:', error);
      }
    } else {
      console.log('userId or db is not available');
    }
  };

  useEffect(() => {
    console.log('Component mounted');
    if (score > 0) {
      setShowScoreSparkle(true);
      setTimeout(() => setShowScoreSparkle(false), 1000);
    }
  }, [score]);

  useEffect(() => {
    console.log('userId or db changed');
    console.log('userId:', userId);
    console.log('db:', db);
    if (userId && db) {
      const fetchLearningLevel = async () => {
        try {
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          if (userData && userData.learningLevel) {
            setLearningLevel(userData.learningLevel);
            console.log(`Fetched learning level: ${userData.learningLevel}`);
          } else {
            console.log('No learning level found in user data');
          }
        } catch (error) {
          console.error('Failed to fetch learning level:', error);
        }
      };

      fetchLearningLevel();
    }

    const auth = getFirebaseAuth();
    const unsubscribe = auth.onAuthStateChanged(handleUserUpdate);
    return unsubscribe;
  }, [userId, db]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <NavigationButtons resetGame={resetGame} question={question} onSkipSubmit={handleSkipSubmit} />
        {question.codeSnippet && <ChatWithScript isOpen={showChatWindow} onClose={toggleChatWindow} codeSnippet={question.codeSnippet} userId={userId} db={db} />}
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
          {!user ? <Auth onUserAuth={handleUserAuth} /> :
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
              isGameOver && userId && gameId && isFirebaseUpdated ?
                <GameOver
                  score={score}
                  questionsAnswered={questionsAnswered}
                  conversationHistory={conversationHistory}
                  gameId={gameId}
                  userId={userId}
                  db={db}
                  longestStreak={longestStreak}
                  incorrectAnswers={incorrectAnswers}
                  currentStreak={currentStreak}
                /> :
                <>
                  <CodeSnippetDisplay codeSnippet={question.codeSnippet} loading={isLoading} />
                  <UserAnswerInput
                    options={question.options}
                    onAnswerSubmit={handleAnswerSubmit}
                    disabled={isLoading}
                    correctAnswerIndex={correctAnswerIndex}
                    setScore={setScore}
                  />
                </>}
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
    </div>
  );
}
