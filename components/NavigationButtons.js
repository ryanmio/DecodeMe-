// components/NavigationButtons.js
import React from 'react';
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import OptionsMenu from '../components/OptionsMenu';

const NavigationButtons = ({ resetGame, question, onSkipSubmit }) => {
  const router = useRouter();

  const handleHomeClick = () => {
    resetGame();
    router.push('/'); // Navigate to home page
  };

  return (
    <div className="absolute top-4 left-4 flex space-x-2">
      <button onClick={handleHomeClick} className="text-cyan-400"><FaHome size={24} /></button>
      <OptionsMenu onSkipSubmit={onSkipSubmit} isCodeSnippetDisplayed={!!question.codeSnippet} />
    </div>
  );
};

export default NavigationButtons;