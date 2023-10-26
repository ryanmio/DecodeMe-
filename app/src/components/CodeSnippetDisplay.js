import React from 'react';
import PropTypes from 'prop-types';
import { CodeBlock, dracula } from 'react-code-blocks';
import { useSpring, animated } from '@react-spring/web';

export default function CodeSnippetDisplay({ codeSnippet, loading }) {
  const formattedCodeSnippet = codeSnippet 
    ? codeSnippet.replace(/```python\n|```python|```/g, '').trim() 
    : '';

   // Spring for loading state
   const fadeLoading = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div>
      <h2 className="text-xl font-medium mb-3 text-left text-gray-900">Code Snippet</h2>
      <div className="max-w-[600px] mx-auto">
        {loading ? (
          <animated.div style={fadeLoading}>
            <CodeBlock
              text={"Loading..." + "\n".repeat(5)}
              language={"plaintext"}
              showLineNumbers={false}
              theme={dracula}
              wrapLines
            />
          </animated.div>
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
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
