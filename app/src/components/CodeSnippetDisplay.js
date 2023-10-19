import React from 'react';
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

export default function CodeSnippetDisplay({ codeSnippet }) {
  return (
    <div>
      <h1>Code Snippet</h1>
      <pre>{codeSnippet}</pre>
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
};