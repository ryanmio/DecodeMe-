// components/NavigationButtons.js
import React from 'react';
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import OptionsMenu from '../components/OptionsMenu';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const NavigationButtons = ({ resetGame, question, onSkipSubmit, gameMode, isGameOver }) => {
  const router = useRouter();
  const { loading } = useAuth(); // Use the useAuth hook to get the loading state

  const handleHomeClick = () => {
    resetGame();
    router.push('/').catch((error) => {
      console.error('Failed to navigate to home:', error);
    });
  };

  return (
    <div className="absolute top-4 left-4 flex space-x-2 items-center">
      <button onClick={handleHomeClick} className="text-cyan-400"><FaHome size={24} /></button>
      <OptionsMenu onSkipSubmit={onSkipSubmit} isCodeSnippetDisplayed={!!question.codeSnippet} gameMode={gameMode} isGameOver={isGameOver} disabled={loading} />
    </div>
  );
};

export default NavigationButtons;