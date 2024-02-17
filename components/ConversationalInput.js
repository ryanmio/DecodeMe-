// components/ConversationalInput.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ConversationalInput({ onMessageSubmit, disabled }) {
  const [userMessage, setUserMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onMessageSubmit(userMessage);
    setUserMessage(''); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <input 
        type="text" 
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        disabled={disabled}
        className="w-full p-2 border rounded"
        placeholder="Type your response..."
      />
      <button 
        type="submit" 
        disabled={disabled || !userMessage.trim()}
        className="w-full mt-2 py-2 text-white bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 rounded"
      >
        Submit
      </button>
    </form>
  );
}

ConversationalInput.propTypes = {
  onMessageSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};