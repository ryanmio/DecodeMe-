// app/src/components/GameModeSelection.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function GameModeSelection({ onGameModeSelect }) {
  const gameModes = ['Multiple Choice', 'Conversational', 'Daily Challenge'];
  const [selectedMode, setSelectedMode] = useState(null);

  const handleGameModeSelect = (mode) => {
    setSelectedMode(mode);
    onGameModeSelect(mode);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Select a Game Mode</h1>
      <ul className="space-y-4">
        {gameModes.map((mode) => {
          const buttonClass = `w-full text-left py-2 px-4 rounded shadow ${selectedMode === mode ? 'bg-blue-500 text-white' : 'bg-white'} transition-all duration-200 ease-in-out ${mode !== 'Multiple Choice' ? 'cursor-not-allowed opacity-50' : 'hover:shadow-lg hover:scale-105'}`;
          return (
            <li key={mode} className="w-full">
              <button 
                onClick={() => handleGameModeSelect(mode)}
                className={buttonClass}
                disabled={mode !== 'Multiple Choice'}
              >
                {mode}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

GameModeSelection.propTypes = {
  onGameModeSelect: PropTypes.func.isRequired,
};

export default GameModeSelection;
