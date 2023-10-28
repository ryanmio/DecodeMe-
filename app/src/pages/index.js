import React, { useState } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';
import { FaHome } from 'react-icons/fa';

export default function Home() {
  const [user, setUser] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [question, setQuestion] = useState({ codeSnippet: null, options: [] });
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [correctAnswerIndex] = useState(0);

  const questionLimit = 10;

  const handleUserAuth = setUser;
  const handleGameModeSelect = mode => {
    setGameMode(mode);
    handleCodeSnippetFetch([]);
  };

  const handleAnswerSubmit = async (answerIndex, isCorrect) => {
    const answer = question.options[answerIndex];
    setConversationHistory(prev => [...prev, { role: 'user', content: answer }]);
    await handleCodeSnippetFetch([...conversationHistory, { role: 'user', content: answer }]);
    setQuestionsAnswered(prev => prev + 1);
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
        // options = options.map(option => option.slice(3));
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

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <button onClick={resetGame} className="absolute top-4 left-4 text-cyan-400"><FaHome size={24} /></button>
          <h1 className="text-2xl font-medium mb-5 text-center text-gray-900">DecodeMe! Score: {score}</h1>
          {!user ? <Auth onUserAuth={handleUserAuth} /> : !gameMode ? <GameModeSelection onGameModeSelect={handleGameModeSelect} /> : questionsAnswered >= questionLimit ? <p className="text-center">Game over! Your final score is {score} out of {questionLimit}.</p> : <>
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
