import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';

export default function UserAnswerInput({ options = [], onAnswerSubmit, disabled }) {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (!disabled) {
      setSelectedOption('');
    }
  }, [disabled]);

  const fadeAnswers = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
    config: { tension: 200, friction: 20 },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswerSubmit(options.indexOf(selectedOption));
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto mt-4 space-y-4">
       <h2 className="text-xl font-medium mt-2 text-gray-900">What does this code do?</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <animated.div style={fadeAnswers} className="space-y-2">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`flex items-center p-4 rounded-lg border border-gray-200 transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg hover:scale-105 shadow-sm ${selectedOption === option ? 'bg-purple-100 shadow-md' : 'bg-white'}`}
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
              <label htmlFor={`option${index}`} className={`text-lg ${selectedOption === option ? 'text-gray-900' : 'text-gray-900'}`}>{option}</label>
            </div>
          ))}
        </animated.div>
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
