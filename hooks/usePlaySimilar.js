// hooks/usePlaySimilar.js

import { useRouter } from 'next/router';

const usePlaySimilar = () => {
  const router = useRouter();

  const handlePlaySimilar = (selectedScript, resetGame) => {
    console.log('usePlaySimilar - handlePlaySimilar called with:', selectedScript);

    // Reset the game state here if resetGame is a function
    if (typeof resetGame === 'function') {
      resetGame(false); // Reset the game without clearing local storage
    }

    // Set up "Play Similar" mode in local storage
    localStorage.setItem('selectedScriptForSimilarGame', JSON.stringify(selectedScript));
    localStorage.setItem('playSimilar', 'true');
    
    // Check if we're already on the home page to avoid unnecessary navigation
    if (router.pathname !== '/') {
      router.push('/');
    }
  };

  return handlePlaySimilar;
};

export default usePlaySimilar;