// hooks/usePlaySimilar.js
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { GameContext } from '../contexts/GameContext';

const usePlaySimilar = () => {
  const router = useRouter();

  const handlePlaySimilar = (selectedScript) => {
    console.log('usePlaySimilar - handlePlaySimilar called with:', selectedScript);
    localStorage.setItem('selectedScriptForSimilarGame', JSON.stringify(selectedScript));
    localStorage.setItem('playSimilar', 'true'); // Set a flag indicating the user wants to play a similar game
    router.push('/'); // Navigate to the home page
  };

  return handlePlaySimilar;
};

export default usePlaySimilar;