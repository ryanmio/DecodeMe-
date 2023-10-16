'use client';

import React, { useState } from 'react';

export default function UserAnswerInput() {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle answer submission
    console.log(answer);
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