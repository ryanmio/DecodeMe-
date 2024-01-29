// components/CodeSnippetDisplay.js
import React from 'react';
import PropTypes from 'prop-types';
import { CodeBlock, dracula } from 'react-code-blocks';
import { useSpring, animated } from '@react-spring/web';
import { Ping } from '@uiball/loaders';
import PythonChip from '../components/PythonChip';

export default function CodeSnippetDisplay({ codeSnippet, loading }) {
  const formattedCodeSnippet = codeSnippet?.replace(/```python\n|```python|```/g, '').trim() || '';
  const fadeLoading = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200, config: { tension: 200, friction: 20 } });
  const placeholder = " ".repeat(70) + "\n".repeat(4);

  return (
    <div>
      <h2 className="text-xl font-medium mb-3 text-left text-gray-900">Code Snippet</h2>
      <div className="max-w-[600px] mx-auto relative">
        <div style={{width: '100%'}}>
          <CodeBlock 
            text={formattedCodeSnippet || placeholder} 
            language={"python"} 
            showLineNumbers={false} 
            theme={dracula} 
            wrapLines 
            style={{minWidth: '300px', minHeight: '200px'}}
          />
          {/* <div style={{position: 'absolute', top: 5, right: 5}}>
            <PythonChip />
          </div> */}
          {loading && (
            <animated.div style={fadeLoading} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Ping size={45} speed={2} color="white" />
            </animated.div>
          )}
        </div>
      </div>
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
