import React, { useState } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

export default function Home() {
  const [user, setUser] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleUserAuth = (user) => {
    setUser(user);
  };

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
  };

  const handleAnswerSubmit = (answer) => {
    console.log(`User's answer: ${answer}`);
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleCodeSnippetFetch = (data) => {
    setCorrectAnswer(data.correctAnswer);
    // handle other data as needed
  };

  return (
    <div>
      <h1>DecodeMe!</h1>
      {!user ? (
        <Auth onUserAuth={handleUserAuth} />
      ) : !gameMode ? (
        <GameModeSelection onGameModeSelect={handleGameModeSelect} />
      ) : (
        <>
          <CodeSnippetDisplay gameMode={gameMode} onCodeSnippetFetch={handleCodeSnippetFetch} />
          <UserAnswerInput onAnswerSubmit={handleAnswerSubmit} />
        </>
      )}
    </div>
  );
}