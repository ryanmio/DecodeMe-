import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const SyntaxHighlighter = dynamic(
  import('react-syntax-highlighter/dist/cjs/prism').then(mod => mod.Prism),
  { ssr: false }
);
const solarizedlight = dynamic(
  import('react-syntax-highlighter/dist/cjs/styles/prism').then(mod => mod.solarizedlight),
  { ssr: false }
);

async function fetchCodeSnippet(gameMode, conversationHistory) {
  const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet?gameMode=${gameMode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ conversationHistory }),
  });

  if (!response.ok) {
    console.error(`Error fetching code snippet: ${response.status} ${response.statusText}`);
    return { error: `Error fetching code snippet: ${response.status} ${response.statusText}` };
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`Error parsing response as JSON: ${err}`);
    return { error: `Error parsing response as JSON: ${err}` };
  }

  return data;
}

export default function CodeSnippetDisplay({ gameMode, onCodeSnippetFetch }) {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [options, setOptions] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);

  useEffect(() => {
    fetchCodeSnippet(gameMode, conversationHistory).then(data => {
      setCodeSnippet(data.codeSnippet);
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