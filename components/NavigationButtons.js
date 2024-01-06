// components/NavigationButtons.js
import React from 'react';
import { useRouter } from 'next/router';
import { FiHome } from 'react-icons/fi'; // Import FiHome instead of FaHome
import OptionsMenu from '../components/OptionsMenu';
import { useAuth } from '../contexts/AuthContext';

const NavigationButtons = ({ resetGame, question, onSkipSubmit, gameMode, isGameOver }) => {
  const router = useRouter();
  const { loading } = useAuth();

  const handleHomeClick = () => {
    resetGame();
    router.push('/').catch((error) => {
      console.error('Failed to navigate to home:', error);
    });
  };
  return (
    <div className="absolute top-4 left-4 flex space-x-2 items-center">
      <button onClick={handleHomeClick} className="text-cyan-400"><FiHome size={24} /></button> {/* Use FiHome instead of FaHome */}
      <OptionsMenu onSkipSubmit={onSkipSubmit} isCodeSnippetDisplayed={!!question.codeSnippet} gameMode={gameMode} isGameOver={isGameOver} disabled={loading} />
    </div>
  );
};

export default NavigationButtons;