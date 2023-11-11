import React, { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';
import Sparkle from '../components/Sparkle';
import { FaHome } from 'react-icons/fa';
import OptionsMenu from '../components/OptionsMenu';
import { getFirebaseAuth, getFirebaseFirestore } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import GameOver from '../components/GameOver';

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

  const questionLimit = 2;

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
    const answer = question.options[answerIndex];
    const newConversationHistory = [...conversationHistory, { role: 'user', content: answer }];
    setConversationHistory(newConversationHistory);
    await handleCodeSnippetFetch(newConversationHistory);
    setQuestionsAnswered(prev => prev + 1);

    // Log the answered question in Firestore
    const auth = await getFirebaseAuth();
    const questionId = uuidv4();
    const questionDoc = doc(db, 'users', userId, 'games', gameId, 'history', questionId);
    setDoc(questionDoc, {
      question: question.codeSnippet,
      answer,
      isCorrect,
      gameId,
      timestamp: new Date()
    }).catch((error) => {
      console.error('Failed to log answer:', error);
    });
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
  };

  useEffect(() => {
    if (score > 0) {
      setShowScoreSparkle(true);
      setTimeout(() => setShowScoreSparkle(false), 1000);
    }
  }, [score]);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = auth.onAuthStateChanged(handleUserUpdate);
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="absolute top-4 left-4 flex space-x-2">
            <button onClick={resetGame} className="text-cyan-400"><FaHome size={24} /></button>
            <OptionsMenu />
          </div>
          <h1 className="text-2xl font-medium mb-5 text-center text-gray-900">
            DecodeMe! Score:{" "}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                {showScoreSparkle && <Sparkle />}
              </div>
              {score}
            </div>
          </h1>
          {!user ? <Auth onUserAuth={handleUserAuth} /> : !gameMode ? <GameModeSelection onGameModeSelect={handleGameModeSelect} /> : questionsAnswered >= questionLimit && userId ? <GameOver score={score} questionLimit={questionLimit} conversationHistory={conversationHistory} gameId={gameId} userId={userId} db={db} /> : <>
            <CodeSnippetDisplay codeSnippet={question.codeSnippet} loading={isLoading} />
            <UserAnswerInput
              options={question.options}
              onAnswerSubmit={handleAnswerSubmit}
              disabled={isLoading}
              correctAnswerIndex={correctAnswerIndex}
              setScore={setScore}
            />
          </>}
        </div>
      </div>
    </div>
  );
}