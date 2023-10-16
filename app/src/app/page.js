import React from 'react';
import Auth from '../components/Auth';
import GameModeSelection from '../components/GameModeSelection';
import CodeSnippetDisplay from '../components/CodeSnippetDisplay';
import UserAnswerInput from '../components/UserAnswerInput';

export default function Home() {
  return (
    <div>
      <h1>DecodeMe!</h1>
      <Auth />
      <GameModeSelection />
      <CodeSnippetDisplay />
      <UserAnswerInput />
    </div>
  );
}
