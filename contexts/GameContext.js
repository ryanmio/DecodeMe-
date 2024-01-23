import React, { createContext, useContext, useCallback } from 'react';

const GameContext = createContext({
  handlePlaySimilarScript: () => {},
  // You can add more game-related functions and state here as needed
});

export const GameProvider = ({ children }) => {
  const handlePlaySimilarScript = useCallback((script) => {
    // Logic to start a new game with the selected script
    // This might involve setting state, calling an API, etc.
  }, []);

  // ... other game-related logic

  // The value object contains all the context data and functions
  const value = {
    handlePlaySimilarScript,
    // ... other game-related data and functions
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

export default GameContext;