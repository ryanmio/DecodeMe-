import React, { useState } from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

export default function Home() {
  const [user, setUser] = useState(null);
  const [gameMode, setGameMode] = useState(null);

  const handleUserAuth = (user) => {
    setUser(user);
  };

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
  };

  const handleAnswerSubmit = (answer) => {
    console.log(`User's answer: ${answer}`);
    // TODO: Check if the answer is correct and update the user's score
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
          <CodeSnippetDisplay gameMode={gameMode} />
          <UserAnswerInput onAnswerSubmit={handleAnswerSubmit} />
        </>
      )}
    </div>
  );
}