import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import Sparkle from '../components/Sparkle';

export default function UserAnswerInput({ options = [], onAnswerSubmit, disabled, correctAnswerIndex, setScore }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [submittedOption, setSubmittedOption] = useState('');
  const [displayOptions, setDisplayOptions] = useState([]);
  const [correctDisplayIndex, setCorrectDisplayIndex] = useState(null);
  const [showSparkle, setShowSparkle] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!disabled) {
      const shuffledOptions = Math.random() < 0.5 ? options.slice().reverse() : options;
      setDisplayOptions(shuffledOptions);
      setCorrectDisplayIndex(shuffledOptions.indexOf(options[correctAnswerIndex]));
      setSelectedOption('');
      setSubmittedOption('');
      setShowSparkle(false);
    }
  }, [disabled, options, correctAnswerIndex]);

  const fadeAnswers = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
    config: { tension: 200, friction: 20 },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedOption(selectedOption);
    const originalIndex = options.indexOf(selectedOption);
    if (originalIndex === correctAnswerIndex) {
      setScore(prevScore => prevScore + 1);
      onAnswerSubmit(originalIndex, true);
      setShowSparkle(true);
      setShake(false);
    } else {
      onAnswerSubmit(originalIndex, false);
      setShake(true);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto mt-4 space-y-4">
      <h2 className="text-xl font-medium mt-2 text-gray-900">What does this code do?</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <animated.div style={fadeAnswers} className="space-y-2">
          {displayOptions.map((option) => {
            const baseClass = 'flex items-center p-4 rounded-lg border border-gray-200 transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg hover:scale-105 shadow-sm';
            const selectedClass = selectedOption === option ? 'bg-purple-100 shadow-md' : 'bg-white';
            const submittedClass = submittedOption === option ? (displayOptions.indexOf(submittedOption) === correctDisplayIndex ? 'bg-green-100 shadow-md' : 'bg-red-100 shadow-md') : '';
            return (
              <div 
                key={option} 
                className={`${baseClass} ${selectedClass} ${submittedClass}`}
                onClick={() => !disabled && setSelectedOption(option)}
              >
                <input 
                  type="radio" 
                  id={`option${option}`} 
                  name="option" 
                  value={option} 
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)} 
                  className="hidden"
                  disabled={disabled}
                />
                <label htmlFor={`option${option}`} className="text-lg text-gray-900">{option}</label>
                {showSparkle && submittedOption === option && displayOptions.indexOf(submittedOption) === correctDisplayIndex && <Sparkle />}
              </div>
            );
          })}
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
  correctAnswerIndex: PropTypes.number,
  setScore: PropTypes.func,
};
