// components/CodeSnippetDisplay.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CodeBlock, dracula } from 'react-code-blocks';
import { useSpring, animated } from '@react-spring/web';
import { Ping } from '@uiball/loaders';

export default function CodeSnippetDisplay({ codeSnippet, loading }) {
  const formattedCodeSnippet = codeSnippet?.replace(/```python\n|```python|```/g, '').trim() || '';
  const fadeLoading = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200, config: { tension: 200, friction: 20 } });
  const placeholder = " ".repeat(70) + "\n".repeat(4);

  // Define descriptions
  const descriptions = ["generating...", "validating...", "thinking...", "almost there..."];
  const [currentDescription, setCurrentDescription] = useState(descriptions[0]);

  // Implement cycling logic
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setCurrentDescription((prevDescription) => {
          const currentIndex = descriptions.indexOf(prevDescription);
          // Proceed to the next description or stay on the last one if it's already the last
          return currentIndex < descriptions.length - 1 ? descriptions[currentIndex + 1] : prevDescription;
        });
      }, 2000); // Change description every 2 seconds
    } else {
      // Reset to the first description when not loading
      setCurrentDescription(descriptions[0]);
    }
    return () => {
      if (interval) {
        clearInterval(interval); // Clear interval on component unmount or loading complete
      }
    };
  }, [loading, descriptions]);

  return (
    <div>
      <h2 className="text-xl font-medium mb-3 text-left text-gray-900">Code Snippet</h2>
      <div className="max-w-[600px] mx-auto relative" >
        <div style={{width: '100%'}}>
          <CodeBlock 
            text={formattedCodeSnippet || placeholder} 
            language={"python"} 
            showLineNumbers={false} 
            theme={dracula} 
            wrapLines 
            style={{minWidth: '300px', minHeight: '250px'}} // Increased minHeight for more vertical space
          />
          {loading && (
            <animated.div style={fadeLoading} className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
              <Ping size={45} speed={2} color="white" />
              <p className="mt-2 text-white">{currentDescription}</p>
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
