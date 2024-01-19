// SoundContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const SoundContext = createContext();

export const useSoundContext = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    // Check if window is defined (i.e., if we are on the client side)
    if (typeof window !== 'undefined') {
      const savedMuteState = localStorage.getItem('isMuted');
      return savedMuteState ? JSON.parse(savedMuteState) : false;
    }
    // Default value if we're on the server
    return false;
  });

  useEffect(() => {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  return (
    <SoundContext.Provider value={{ isMuted, setIsMuted }}>
      {children}
    </SoundContext.Provider>
  );
};