import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

async function fetchCodeSnippet(gameMode) {
  const response = await fetch(`/api/code-snippets?gameMode=${gameMode}`);
  const data = await response.json();
  return data.codeSnippet;
}

export default function CodeSnippetDisplay({ gameMode }) {
  const [codeSnippet, setCodeSnippet] = useState('');

  useEffect(() => {
    fetchCodeSnippet(gameMode).then(setCodeSnippet);
  }, [gameMode]);

  return (
    <div>
      <h1>Code Snippet</h1>
      <pre>{codeSnippet}</pre>
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  gameMode: PropTypes.string.isRequired,
};