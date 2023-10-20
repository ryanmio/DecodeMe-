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

  // Remove backticks, language specification, and leading/trailing whitespace from the code snippet
  const formattedCodeSnippet = codeSnippet 
    ? codeSnippet.replace(/```python\n|```python|```/g, '').trim() 
    : '';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Code Snippet</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-w-[600px] mx-auto">
          <CodeBlock
            text={formattedCodeSnippet}
            language={"python"}
            showLineNumbers={true}
            theme={dracula}
            wrapLines
          />
        </div>
      )}
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
};