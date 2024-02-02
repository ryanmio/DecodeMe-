import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { Ping } from '@uiball/loaders';
import Prism from 'prismjs';
// Import the language syntax you need, for example, JavaScript
import 'prismjs/components/prism-python';
// Import additional languages as needed

export default function CodeSnippetDisplay({ codeSnippet, loading, language = 'python' }) {
  const [formattedCodeSnippet, setFormattedCodeSnippet] = useState('');
  const codeRef = useRef(null);
  const fadeLoading = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200, config: { tension: 200, friction: 20 } });
  const placeholder = " ".repeat(70) + "\n".repeat(4);

  // Define descriptions
  const descriptions = ["generating...", "validating...", "thinking...", "almost there..."];
  const [currentDescription, setCurrentDescription] = useState(descriptions[0]);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setCurrentDescription((prevDescription) => {
          const currentIndex = descriptions.indexOf(prevDescription);
          return currentIndex < descriptions.length - 1 ? descriptions[currentIndex + 1] : prevDescription;
        });
      }, 2000);
    } else {
      setCurrentDescription(descriptions[0]);
    }
    return () => clearInterval(interval);
  }, [loading, descriptions]);

  useEffect(() => {
    // Process the code snippet to ensure it's properly formatted for display
    const processedCodeSnippet = codeSnippet?.replace(/```python\n|```python|```/g, '').trim() || placeholder;
    setFormattedCodeSnippet(processedCodeSnippet);
  }, [codeSnippet]);

  useEffect(() => {
    // Highlight the syntax using Prism
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [formattedCodeSnippet, language]);

  return (
    <div>
      <h2 className="text-xl font-medium mb-3 text-left text-gray-900">Code Snippet</h2>
      <div className="max-w-[600px] mx-auto relative">
      <pre style={{
          minWidth: '300px',
          minHeight: '250px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal', // Changed from 'break-all' to 'normal'
          overflowWrap: 'break-word', // Ensures that words are only broken at appropriate points
          background: '#f6f8fa',
          padding: '1em',
          borderRadius: '5px',
          border: '1px solid #ddd',
          overflowX: 'auto'
        }}>
          <code ref={codeRef} className={`language-${language}`} style={{
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word' // Ensures that words are only broken at appropriate points
          }}>{formattedCodeSnippet}</code>
        </pre>
        {loading && (
          <animated.div style={fadeLoading} className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <Ping size={45} speed={2} color="white" />
            <p className="mt-2 text-white">{currentDescription}</p>
          </animated.div>
        )}
      </div>
    </div>
  );
}

CodeSnippetDisplay.propTypes = {
  codeSnippet: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  language: PropTypes.string,
};