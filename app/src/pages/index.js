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
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const questionLimit = 10;

  const handleUserAuth = (user) => {
    setUser(user);
  };

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
  };

  const handleAnswerSubmit = (answer) => {
    console.log(`User's answer: ${answer}`);
    if (answer === codeSnippet) {
      setScore(score + 1);
      setResult('Correct!');
    } else {
      setResult('Incorrect. Try again.');
    }
    setQuestionsAnswered(questionsAnswered + 1);
    if (questionsAnswered < questionLimit - 1) {
      // Fetch a new code snippet after the user answers a question
      handleCodeSnippetFetch();
    }
  };

  const handleCodeSnippetFetch = async () => {
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet?gameMode=${gameMode}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setCodeSnippet(data.conversationHistory[data.conversationHistory.length - 1].content);
      setResult(null); // Clear the result when a new question is fetched
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
          <UserAnswerInput onAnswerSubmit={handleAnswerSubmit} />
          {result && <p>{result}</p>}
        </>
      )}
    </div>
  );
}