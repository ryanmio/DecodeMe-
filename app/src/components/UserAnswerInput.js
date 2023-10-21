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
          <div key={index} className="flex items-center space-x-3">
            <input 
              type="radio" 
              id={`option${index}`} 
              name="option" 
              value={option} 
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)} 
              className="form-radio text-indigo-600 h-5 w-5"
            />
            <label htmlFor={`option${index}`} className="text-lg">{option}</label>
          </div>
        ))}
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
}

UserAnswerInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onAnswerSubmit: PropTypes.func.isRequired,
};