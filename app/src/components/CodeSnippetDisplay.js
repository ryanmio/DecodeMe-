import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

async function fetchCodeSnippet(gameMode, conversationHistory) {
  const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet?gameMode=${gameMode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ conversationHistory }),
  });
  const data = await response.json();
  const responseText = data.text.trim();
  const codeSnippet = responseText.split('```\n')[1].split('\n```')[0].trim();
  return { ...data, codeSnippet };
}

export default function CodeSnippetDisplay({ gameMode, onCodeSnippetFetch }) {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [options, setOptions] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);

  useEffect(() => {
    fetchCodeSnippet(gameMode, conversationHistory).then(data => {
      setCodeSnippet(data.codeSnippet);
      setOptions(data.options);
      setConversationHistory(data.conversationHistory);
      onCodeSnippetFetch(data);
    });
  }, [gameMode, onCodeSnippetFetch, conversationHistory]);

  return (
    <div>
      <h1>Code Snippet</h1>
      <SyntaxHighlighter language="python" style={solarizedlight}>
        {codeSnippet}
      </SyntaxHighlighter>
      <h2>Options</h2>
      {options && options.map((option, index) => (
        <div key={index}>
          <input type="radio" id={`option${index}`} name="option" value={option} />
          <label htmlFor={`option${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  gameMode: PropTypes.string.isRequired,
  onCodeSnippetFetch: PropTypes.func.isRequired,
};