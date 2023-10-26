import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function UserAnswerInput({ options = [], onAnswerSubmit, disabled }) {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (!disabled) {
      setSelectedOption('');
    }
  }, [disabled]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswerSubmit(selectedOption);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4 space-y-4">
      <h3 className="text-2xl font-extrabold text-gray-900 mb-4">What does this code do?</h3>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="space-y-2">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center p-4 rounded-lg transition duration-200 ease-in-out cursor-pointer ring-1 ring-gray-300 ${selectedOption === option ? 'ring-2 ring-gradient-to-r from-purple-400 via-pink-500 to-red-500' : 'hover:ring-2 hover:ring-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500'}`}
              onClick={() => !disabled && setSelectedOption(option)}
            >
              <input 
                type="radio" 
                id={`option${index}`} 
                name="option" 
                value={option} 
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)} 
                className="hidden"
                disabled={disabled}
              />
              <label htmlFor={`option${index}`} className={`text-lg ${selectedOption === option ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>{option}</label>
            </div>
          ))}
        </div>
        <button type="submit" className={`w-full mt-4 py-2 text-white rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'}`} disabled={disabled}>
          {disabled && selectedOption ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

UserAnswerInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onAnswerSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
