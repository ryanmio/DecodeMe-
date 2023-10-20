import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter/dist/cjs/prism').then(mod => mod.Prism),
  { ssr: false }
);
const solarizedlight = dynamic(
  () => import('react-syntax-highlighter/dist/cjs/styles/prism/solarizedlight'),
  { ssr: false }
);

export default function CodeSnippetDisplay({ codeSnippet }) {
  // Remove backticks from the code snippet
  const formattedCodeSnippet = codeSnippet ? codeSnippet.replace(/```/g, '') : '';

  return (
    <div>
      <h1>Code Snippet</h1>
      {formattedCodeSnippet ? (
        <SyntaxHighlighter language="python" style={solarizedlight}>
          {formattedCodeSnippet}
        </SyntaxHighlighter>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
};