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
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Your Answer</h1>
      <form onSubmit={handleSubmit} className="w-full">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 mb-2 bg-white shadow rounded p-4">
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
        <button type="submit" className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
}

UserAnswerInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onAnswerSubmit: PropTypes.func.isRequired,
};