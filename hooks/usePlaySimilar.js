// hooks/usePlaySimilar.js

import { useRouter } from 'next/router';

const usePlaySimilar = () => {
  const router = useRouter();

  const handlePlaySimilar = (selectedScript, resetGame) => {
    console.log('usePlaySimilar - handlePlaySimilar called with:', selectedScript);

    // Set a flag in local storage to indicate a game reset is requested
    localStorage.setItem('requestResetGame', 'true');
    // Dispatch a custom storage event to trigger the reset immediately if on the same page
    window.dispatchEvent(new Event('storage'));

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