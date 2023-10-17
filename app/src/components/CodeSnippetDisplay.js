import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

async function fetchCodeSnippet(gameMode) {
  const response = await fetch(`/api/code-snippets?gameMode=${gameMode}`);
  const data = await response.json();
  return data;
}

export default function CodeSnippetDisplay({ gameMode }) {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    fetchCodeSnippet(gameMode).then(data => {
      setCodeSnippet(data.codeSnippet);
      setOptions(data.options);
      setCorrectAnswer(data.correctAnswer);
    });
  }, [gameMode]);

  return (
    <div>
      <h1>Code Snippet</h1>
      <pre>{codeSnippet}</pre>
      <h2>Options</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  gameMode: PropTypes.string.isRequired,
};