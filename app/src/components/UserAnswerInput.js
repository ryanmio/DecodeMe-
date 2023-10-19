import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function UserAnswerInput({ options = [], onAnswerSubmit }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswerSubmit(selectedOption);
    setSelectedOption('');
  };

  return (
    <div>
      <h1>Your Answer</h1>
      <form onSubmit={handleSubmit}>
        {options.map((option, index) => (
          <div key={index}>
            <input 
              type="radio" 
              id={`option${index}`} 
              name="option" 
              value={option} 
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)} 
            />
            <label htmlFor={`option${index}`}>{option}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

UserAnswerInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onAnswerSubmit: PropTypes.func.isRequired,
};
