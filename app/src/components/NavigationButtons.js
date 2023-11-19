// app/src/components/NavigationButtons.js

import React from 'react';
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import OptionsMenu from './OptionsMenu';

const NavigationButtons = ({ questionsAnswered, setShowEndGameModal, resetGame }) => {
  console.log('NavigationButtons rendered');
  const router = useRouter();

  const handleHomeClick = () => {
    console.log('Home button clicked');
    if (questionsAnswered >= 1) {
      setShowEndGameModal(true);
    } else {
      resetGame();
    }
  };

  return (
    <div className="absolute top-4 left-4 flex space-x-2">
      <button onClick={() => { console.log('onClick triggered'); handleHomeClick(); }} className="text-cyan-400"><FaHome size={24} /></button>
      <OptionsMenu />
    </div>
  );
};

export default NavigationButtons;