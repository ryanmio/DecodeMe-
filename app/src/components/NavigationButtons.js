// app/src/components/NavigationButtons.js

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import OptionsMenu from './OptionsMenu';
import { GameStateContext } from '../contexts/GameStateContext';

const NavigationButtons = () => {
  const router = useRouter();
  const { resetGame } = useContext(GameStateContext);

  const handleHomeClick = () => {
    console.log('Home button clicked');
    resetGame();
    router.push('/'); // Navigate to home page
  };

  return (
    <div className="absolute top-4 left-4 flex space-x-2">
      <button onClick={handleHomeClick} className="text-cyan-400"><FaHome size={24} /></button>
      <OptionsMenu />
    </div>
  );
};

export default NavigationButtons;