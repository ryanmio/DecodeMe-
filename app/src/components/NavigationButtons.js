import React from 'react';
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import OptionsMenu from './OptionsMenu';

const NavigationButtons = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="absolute top-4 left-4 flex space-x-2">
      <button onClick={handleHomeClick} className="text-cyan-400"><FaHome size={24} /></button>
      <OptionsMenu />
    </div>
  );
};

export default NavigationButtons;