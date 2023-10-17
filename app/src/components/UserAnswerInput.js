'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function UserAnswerInput({ onAnswerSubmit }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the answer up to the parent component
    onAnswerSubmit(answer);
    // Clear the input field
    setAnswer('');
  };

  return (
    <div>
      <h1>Your Answer</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

UserAnswerInput.propTypes = {
  onAnswerSubmit: PropTypes.func.isRequired,
};