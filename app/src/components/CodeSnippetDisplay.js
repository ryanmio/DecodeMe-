import React from 'react';
import PropTypes from 'prop-types';
import { CodeBlock, dracula } from 'react-code-blocks';
import { useSpring, animated } from '@react-spring/web';
import { Ping } from '@uiball/loaders';

export default function CodeSnippetDisplay({ codeSnippet, loading }) {
  const formattedCodeSnippet = codeSnippet?.replace(/```python\n|```python|```/g, '').trim() || '';
  const fadeLoading = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200, config: { tension: 200, friction: 20 } });

  return (
    <div>
      <h2 className="text-xl font-medium mb-3 text-left text-gray-900">Code Snippet</h2>
      <div className="max-w-[600px] mx-auto relative">
        <CodeBlock text={formattedCodeSnippet || " " + "\n".repeat(5)} language={"python"} showLineNumbers={true} theme={dracula} wrapLines />
        {loading && (
          <animated.div style={fadeLoading} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Ping size={45} speed={2} color="white" />
          </animated.div>
        )}
      </div>
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
