// nov 19 -- i stopped using this 

// app/src/contexts/GameStateContext.tsx
import React, { useState } from 'react';

// Initial state of the game
const initialState = {
  gameMode: null,
  question: { codeSnippet: null, options: [] },
  score: 0,
  questionsAnswered: 0,
  conversationHistory: [],
  isLoading: false,
  currentStreak: 0,
  longestStreak: 0,
};

// Create context with default undefined value
const GameStateContext = React.createContext({
  gameState: initialState,
  resetGame: () => undefined,
});

const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialState);

  const resetGame = () => {
    setGameState(initialState);
  };

  return (
    <GameStateContext.Provider value={{ gameState, resetGame }}>
      {children}
    </GameStateContext.Provider>
  );
};

export { GameStateContext, GameStateProvider };
