// SoundContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const SoundContext = createContext();

export const useSoundContext = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuteState = localStorage.getItem('isMuted');
    return savedMuteState ? JSON.parse(savedMuteState) : false;
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