import React from 'react';

export default function GameModeSelection() {
  const gameModes = ['Multiple Choice', 'Open-Ended Questions', 'Data Analysis Challenges'];

  return (
    <div>
      <h1>Select a Game Mode</h1>
      <ul>
        {gameModes.map((mode, index) => (
          <li key={index}>
            <button>{mode}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}