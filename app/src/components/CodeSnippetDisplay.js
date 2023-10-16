import React from 'react';

export default function CodeSnippetDisplay() {
  const codeSnippet = 'Example code snippet';

  return (
    <div>
      <h1>Code Snippet</h1>
      <pre>{codeSnippet}</pre>
    </div>
  );
}