import React from 'react';
import PropTypes from 'prop-types';
import { CodeBlock, dracula } from 'react-code-blocks';
import { useSpring, animated } from '@react-spring/web';

export default function CodeSnippetDisplay({ codeSnippet, loading }) {
  // Remove backticks, language specification, and leading/trailing whitespace from the code snippet
  const formattedCodeSnippet = codeSnippet 
    ? codeSnippet.replace(/```python\n|```python|```/g, '').trim() 
    : '';

  // Define spring animation configs
  const fade = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    reset: true,
    reverse: loading,
    delay: 200,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Code Snippet</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="max-w-[600px] mx-auto">
          <animated.div style={fade}>
            <CodeBlock
              text={formattedCodeSnippet}
              language={"python"}
              showLineNumbers={true}
              theme={dracula}
              wrapLines
            />
          </animated.div>
        </div>
      )}
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};