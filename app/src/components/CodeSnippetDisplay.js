import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

async function fetchCodeSnippet(gameMode) {
  const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet?gameMode=${gameMode}`);
  const data = await response.json();
  return data;
}

export default function CodeSnippetDisplay({ gameMode, onCodeSnippetFetch }) {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchCodeSnippet(gameMode).then(data => {
      setCodeSnippet(data.codeSnippet);
      setOptions(data.options);
      // Call the onCodeSnippetFetch prop with the fetched data
      onCodeSnippetFetch(data);
    });
  }, [gameMode, onCodeSnippetFetch]);

  return (
    <div>
      <h1>Code Snippet</h1>
      <pre>{codeSnippet}</pre>
      <h2>Options</h2>
      <form>
      {options && options.map((option, index) => (
        <div key={index}>
        <input type="radio" id={`option${index}`} name="option" value={option} />
        <label htmlFor={`option${index}`}>{option}</label>
      </div>
    ))}
    </form>
  </div>
);
}

CodeSnippetDisplay.propTypes = {
gameMode: PropTypes.string.isRequired,
onCodeSnippetFetch: PropTypes.func.isRequired,
};