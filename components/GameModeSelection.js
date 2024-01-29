// components/GameModeSelection.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup, useRadio, VisuallyHidden, cn } from "@nextui-org/react";
import { IoIosArrowDroprightCircle } from "react-icons/io";

export const CustomRadio = (props) => {
  const {
    Component,
    children,
    isDisabled,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  // Directly use the cyan-400 class for the hover state
  const hoverClass = !isDisabled ? 'hover:text-cyan-400 hover:border-cyan-400' : '';
  const disabledClass = isDisabled ? 'text-gray-300 cursor-not-allowed opacity-50' : '';

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between flex-row-reverse",
        "max-w-[270px] cursor-pointer border-2 border-gray-300 rounded-lg gap-4 p-4",
        hoverClass,
        disabledClass
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps({ disabled: isDisabled })} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} className="radio-control">
          <IoIosArrowDroprightCircle
            className={cn("text-gray-400", !isDisabled && "group-hover:text-cyan-400", disabledClass)}
            size={24}
          />
        </span>
      </span>
      <div {...getLabelWrapperProps()}>
        {children && (
          <span {...getLabelProps()} className={cn("text-gray-700", !isDisabled && "group-hover:text-cyan-400", disabledClass)}>
            {children}
          </span>
        )}
        {description && (
          <span className={cn("text-small text-foreground opacity-70", !isDisabled && "group-hover:text-cyan-400", disabledClass)}>
            {description}
          </span>
        )}
      </div>
    </Component>
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



