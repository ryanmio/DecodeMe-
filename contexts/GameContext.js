// contexts/GameContext.js
import React, { createContext, useContext, useState } from 'react';

export const GameContext = createContext({
  selectedScriptForSimilarGame: null,
  setSelectedScriptForSimilarGame: () => {},
  isPlaySimilarMode: false,
  setIsPlaySimilarMode: () => {}
});

// Provider component that wraps your app and makes the game context available to any child component that calls useGame()
export const GameProvider = ({ children }) => {
  const [selectedScriptForSimilarGame, setSelectedScriptState] = useState(null);
  const [isPlaySimilarMode, setIsPlaySimilarMode] = useState(false);

  const setSelectedScriptForSimilarGame = (script) => {
    setSelectedScriptState(script);
  };

  // The value object provided to consumers of the context
  const value = {
    selectedScriptForSimilarGame,
    setSelectedScriptForSimilarGame,
    isPlaySimilarMode,
    setIsPlaySimilarMode
  };

  // Render the provider with the value object
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to provide easy access to the context data
export const useGame = () => useContext(GameContext);
