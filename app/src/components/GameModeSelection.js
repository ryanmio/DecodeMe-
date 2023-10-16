import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Error boundary component to catch and handle errors in GameModeSelection
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error in GameModeSelection:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

// GameModeSelection component
function GameModeSelection({ onGameModeSelect }) {
  const gameModes = ['Multiple Choice', 'Open-Ended Questions', 'Data Analysis Challenges'];
  const [selectedMode, setSelectedMode] = useState(null);

  const handleGameModeSelect = (mode) => {
    setSelectedMode(mode);
    onGameModeSelect(mode);
  };

  return (
    <ErrorBoundary>
      <div>
        <h1>Select a Game Mode</h1>
        <ul>
          {gameModes.map((mode, index) => (
            <li key={index}>
              <button onClick={() => handleGameModeSelect(mode)}>{mode}</button>
            </li>
          ))}
        </ul>
        {selectedMode && <p>You selected: {selectedMode}</p>}
      </div>
    </ErrorBoundary>
  );
}

GameModeSelection.propTypes = {
  onGameModeSelect: PropTypes.func.isRequired,
};

export default GameModeSelection;