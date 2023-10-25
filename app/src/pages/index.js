import React, { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';
import { FaHome } from 'react-icons/fa';

export default function Home() {
  const [user, setUser] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const questionLimit = 10;

  const handleUserAuth = (user) => {
    setUser(user);
  };

  const handleGameModeSelect = async (mode) => {
    setGameMode(mode);
    await handleCodeSnippetFetch([]);
  };

  const handleAnswerSubmit = async (answer) => {
    const newConversationHistory = [...conversationHistory, { role: 'user', content: answer }];
    console.log('New conversation history after user submits an answer:', newConversationHistory);
    setConversationHistory(newConversationHistory);
    await handleCodeSnippetFetch(newConversationHistory);
  };

  const handleCodeSnippetFetch = async (conversationHistory) => {
    setIsLoading(true);
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet?gameMode=${gameMode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversationHistory }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data.conversationHistory)) {
        const responseText = data.conversationHistory[data.conversationHistory.length - 1].content;
        const codeSnippetMatch = responseText.match(/```(.|\n)*?```/);
        const codeSnippet = codeSnippetMatch ? codeSnippetMatch[0] : '';
        console.log('New code snippet:', codeSnippet);
        setCodeSnippet(codeSnippet);
        const optionsMatch = responseText.match(/A\) .*\nB\) .*/);
        const options = optionsMatch ? optionsMatch[0].split('\n') : [];
        console.log('New options:', options);
        setOptions(options);
        setResult(null); // Clear the result when a new question is fetched

        // Only update the conversation history if the new message is different from the last one
        if (conversationHistory && (conversationHistory.length === 0 || responseText !== conversationHistory[conversationHistory.length - 1].content)) {
          const updatedConversationHistory = [...conversationHistory, { role: 'assistant', content: responseText }];
          console.log('Updated conversation history after fetching new question:', updatedConversationHistory);
          setConversationHistory(updatedConversationHistory);
        }
      }
    } catch (error) {
      console.error('Failed to fetch code snippet:', error);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setGameMode(null);
    // Reset any other state variables related to the game as needed
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <button onClick={resetGame} className="absolute top-4 left-4 text-cyan-400">
            <FaHome size={24} />
          </button>
          <h1 className="text-2xl font-bold mb-4 text-center">DecodeMe! Score: {score}</h1>
          {!user ? (
            <Auth onUserAuth={handleUserAuth} />
          ) : !gameMode ? (
            <GameModeSelection onGameModeSelect={handleGameModeSelect} />
          ) : questionsAnswered >= questionLimit ? (
            <p className="text-center">Game over! Your final score is {score} out of {questionLimit}.</p>
          ) : (
            <>
              <CodeSnippetDisplay codeSnippet={codeSnippet} loading={isLoading} />
              <UserAnswerInput options={options} onAnswerSubmit={handleAnswerSubmit} isSubmitting={isSubmitting} disabled={isLoading} />
              {result && <p className="text-center">{result}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// https://codesandbox.io/s/to6uf