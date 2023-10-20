import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CodeBlock, dracula } from 'react-code-blocks';

export default function CodeSnippetDisplay({ codeSnippet }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (codeSnippet) {
      setLoading(false);
    }
  }, [codeSnippet]);

   // Remove backticks and language specification from the code snippet
   const formattedCodeSnippet = codeSnippet 
   ? codeSnippet.replace(/```python\n|```/g, '').trim() 
   : '';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Code Snippet</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CodeBlock
          text={formattedCodeSnippet}
          language={"python"}
          showLineNumbers={true}
          theme={dracula}
          wrapLines
        />
      )}
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
};