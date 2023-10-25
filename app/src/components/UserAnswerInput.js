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
    <div className="flex flex-col items-start w-full max-w-md mx-auto mt-4">
      <h3 className="text-xl font-bold mb-4">What does this code do?</h3>
      <form onSubmit={handleSubmit} className="w-full">
        {options.map((option, index) => (
          <div 
            key={index} 
            className={`flex items-center space-x-3 mb-2 shadow rounded p-4 cursor-pointer transform transition-all duration-200 ease-in-out ${selectedOption === option ? 'bg-cyan-400 border-cyan-600 border-2 scale-102' : 'bg-white hover:scale-102 hover:shadow-lg'}`}
            onClick={() => !disabled && setSelectedOption(option)}
          >
            <input 
              type="radio" 
              id={`option${index}`} 
              name="option" 
              value={option} 
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)} 
              className="form-radio text-indigo-600 h-5 w-5"
              style={{ display: 'none' }}
              disabled={disabled}
            />
            <label htmlFor={`option${index}`} className="text-lg">{option}</label>
          </div>
        ))}
        <button type="submit" className={`w-full mt-4 px-4 py-2 text-white rounded ${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`} disabled={disabled}>
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
