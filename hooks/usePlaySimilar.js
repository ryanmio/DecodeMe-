// hooks/usePlaySimilar.js

import { useRouter } from 'next/router';

const usePlaySimilar = () => {
  const router = useRouter();

  const handlePlaySimilar = (selectedScript) => {
    console.log('usePlaySimilar - handlePlaySimilar called with:', selectedScript);
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