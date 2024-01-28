// components/GameModeSelection.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, Radio, cn } from "@nextui-org/react";

const CustomRadio = (props) => {
  const {
    children,
    description,
    isDisabled,
    ...restProps
  } = props;

  return (
    <Radio {...restProps} isDisabled={isDisabled} className={cn(
      "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
      "max-w-[270px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4 mb-2",
      "data-[selected=true]:border-primary",
    )}>
      <div className="flex-grow">
        <span className="font-medium text-content block">{children}</span>
        {description && (
          <span className="text-small text-foreground opacity-70 block">{description}</span> 
        )}
      </div>
    </Radio>
  );
};

function GameModeSelection({ onGameModeSelect, isPlaySimilar }) {
  const gameModes = [
    { mode: 'Click Buttons', description: 'Select between two options' },
    { mode: 'Conversational', description: 'Respond in natural language', isDisabled: true },
    { mode: 'Daily Challenge', description: 'New global challenge daily', isDisabled: true }
  ];
  const [selectedMode, setSelectedMode] = useState(null);

  const handleGameModeSelect = (mode) => {
    setSelectedMode(mode);
    if (!isPlaySimilar) {
      onGameModeSelect(mode);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Select a Game Mode</h1>
      <RadioGroup value={selectedMode} onChange={handleGameModeSelect}>
        {gameModes.map(({ mode, description, isDisabled }) => (
          <CustomRadio key={mode} value={mode} description={description} isDisabled={isDisabled}>
            {mode}
          </CustomRadio>
        ))}
      </RadioGroup>
    </div>
  );
}

GameModeSelection.propTypes = {
  onGameModeSelect: PropTypes.func.isRequired,
  isPlaySimilar: PropTypes.bool
};

export default GameModeSelection;
