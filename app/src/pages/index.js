import React, { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

export default function Home() {
  const [user, setUser] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);

  const questionLimit = 10;

  const handleUserAuth = (user) => {
    setUser(user);
  };

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
  };

  const handleAnswerSubmit = (answer) => {
    setConversationHistory([...conversationHistory, { role: 'user', content: answer }]);
  };

  const handleCodeSnippetFetch = async () => {
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet?gameMode=${gameMode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversationHistory }),
      });

      const data = await response.json();
      const responseText = data.conversationHistory[data.conversationHistory.length - 1].content;
      const codeSnippetMatch = responseText.match(/```(.|\n)*?```/);
      const codeSnippet = codeSnippetMatch ? codeSnippetMatch[0] : '';
      setCodeSnippet(codeSnippet);
      const optionsMatch = responseText.match(/A\) .*\nB\) .*/);
      const options = optionsMatch ? optionsMatch[0].split('\n') : [];
      setOptions(options);
      setResult(null); // Clear the result when a new question is fetched
      setConversationHistory([...conversationHistory, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error('Failed to fetch code snippet:', error);
    }
  };

  // Fetch the first code snippet when the game mode is selected
  useEffect(() => {
    if (gameMode) {
      handleCodeSnippetFetch();
    }
  }, [gameMode]);

  // Fetch the next code snippet when the conversation history changes
  useEffect(() => {
    if (gameMode && conversationHistory.length > 0) {
      handleCodeSnippetFetch();
    }
  }, [conversationHistory]);

  return (
    <div>
      <h1>DecodeMe! Score: {score}</h1>
      {!user ? (
        <Auth onUserAuth={handleUserAuth} />
      ) : !gameMode ? (
        <GameModeSelection onGameModeSelect={handleGameModeSelect} />
      ) : questionsAnswered >= questionLimit ? (
        <p>Game over! Your final score is {score} out of {questionLimit}.</p>
      ) : (
        <>
          <CodeSnippetDisplay codeSnippet={codeSnippet} />
          <UserAnswerInput options={options} onAnswerSubmit={handleAnswerSubmit} />
          {result && <p>{result}</p>}
        </>
      )}
    </div>
  );
}