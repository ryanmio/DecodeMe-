import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { Ping } from '@uiball/loaders';
import Prism from 'prismjs';

// A map to keep track of which languages have been imported
const loadedLanguages = {};

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
    // Function to dynamically load a language only once
    const loadPrismLanguage = async (language) => {
      if (!loadedLanguages[language]) {
        try {
          await import(`prismjs/components/prism-${language}`);
          loadedLanguages[language] = true;
          // Ensure the code is highlighted after the language is loaded
          if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
          }
        } catch (e) {
          console.error(`Error loading Prism language: ${language}`, e);
        }
      }
    };

    if (language && Prism.languages[language]) {
      // If the language is already loaded by Prism, no need to import
      Prism.highlightElement(codeRef.current);
    } else {
      // Load the Prism language dynamically
      loadPrismLanguage(language);
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
          wordBreak: 'normal',
          overflowWrap: 'break-word',
          background: '#f6f8fa',
          padding: '1em',
          borderRadius: '5px',
          border: '1px solid #ddd',
          overflowX: 'auto'
        }}>
          <code ref={codeRef} className={`language-${language}`} style={{
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word'
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