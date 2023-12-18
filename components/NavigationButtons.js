// components/NavigationButtons.js
import React from 'react';
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import OptionsMenu from '../components/OptionsMenu';

const NavigationButtons = ({ resetGame, question, onSkipSubmit, gameMode, isGameOver }) => {
  const router = useRouter();

  const handleHomeClick = () => {
    resetGame();
    router.push('/').catch((error) => {
      console.error('Failed to navigate to home:', error);
    });
  };

  return (
    <div className="absolute top-4 left-4 flex space-x-2">
      <button onClick={handleHomeClick} className="text-cyan-400"><FaHome size={24} /></button>
      <OptionsMenu onSkipSubmit={onSkipSubmit} isCodeSnippetDisplayed={!!question.codeSnippet} gameMode={gameMode} isGameOver={isGameOver} />
    </div>
  );
};

export default NavigationButtons;