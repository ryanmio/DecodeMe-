import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { Ping } from '@uiball/loaders';
import Prism from 'prismjs';
import { CheckboxGroup } from '@nextui-org/react';
import { CustomCheckbox } from './CustomCheckbox';

// A map to keep track of which languages have been imported
const loadedLanguages = {};

export default function CodeSnippetDisplay({ codeSnippet, loading, language = 'python' }) {
  const [formattedCodeSnippet, setFormattedCodeSnippet] = useState('');
  const codeRef = useRef(null);
  const fadeLoading = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200, config: { tension: 200, friction: 20 } });
  const placeholder = " ".repeat(70) + "\n".repeat(4);

  // New state hooks for toggles
  const [isSyntaxHighlightingEnabled, setIsSyntaxHighlightingEnabled] = useState(true);
  const [isLineWrappingEnabled, setIsLineWrappingEnabled] = useState(true);

  // Define descriptions
  const descriptions = ["generating...", "validating...", "parsing...", "almost there..."];
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
    const processedCodeSnippet = codeSnippet?.replace(/```python\n|```python|```/g, '').trim() || placeholder;
    setFormattedCodeSnippet(processedCodeSnippet);
  }, [codeSnippet]);

  useEffect(() => {
    const applyHighlighting = () => {
      if (isSyntaxHighlightingEnabled && language && Prism.languages[language] && codeRef.current) {
        Prism.highlightElement(codeRef.current);
      }
    };

    const loadPrismLanguage = async (language) => {
      if (isSyntaxHighlightingEnabled && !loadedLanguages[language]) {
        try {
          await import(`prismjs/components/prism-${language}`);
          loadedLanguages[language] = true;
          applyHighlighting(); // Ensure highlighting is applied after loading
        } catch (e) {
          console.error(`Error loading Prism language: ${language}`, e);
        }
      } else {
        applyHighlighting(); // Apply highlighting if already loaded
      }
    };

    if (isSyntaxHighlightingEnabled) {
      loadPrismLanguage(language);
    } else {
      // Clear highlighting or reset the code snippet to its unhighlighted state
      if (codeRef.current) {
        codeRef.current.textContent = formattedCodeSnippet; // Use textContent for better performance and to avoid potential XSS vulnerabilities
      }
    }
  }, [formattedCodeSnippet, language, isSyntaxHighlightingEnabled]);

  // Adjust styles based on isLineWrappingEnabled
  const codeStyle = {
    whiteSpace: isLineWrappingEnabled ? 'pre-wrap' : 'pre',
    wordBreak: isLineWrappingEnabled ? 'normal' : 'break-all',
    overflowWrap: isLineWrappingEnabled ? 'break-word' : 'normal',
    overflowX: 'auto', // Ensure horizontal scrolling is possible when line wrapping is disabled
  };

  return (
    <div className="code-snippet-container">
      <h2 className="text-xl font-medium mb-3 text-left text-gray-900">Code Snippet</h2>
      <div className="max-w-[600px] mx-auto relative">
        {/* CheckboxGroup for toggling options */}
        <div className={`checkbox-group-overlay ${loading ? 'loading' : ''}`}>
          <CheckboxGroup
            value={[isSyntaxHighlightingEnabled ? "syntaxHighlighting" : "", isLineWrappingEnabled ? "lineWrapping" : ""].filter(Boolean)}
            onChange={(values) => {
              setIsSyntaxHighlightingEnabled(values.includes("syntaxHighlighting"));
              setIsLineWrappingEnabled(values.includes("lineWrapping"));
            }}
            orientation="horizontal"
          >
            <CustomCheckbox value="syntaxHighlighting" size="sm">Highlight Syntax</CustomCheckbox>
            <CustomCheckbox value="lineWrapping" size="sm">Wrap Lines</CustomCheckbox>
          </CheckboxGroup>
        </div>
        <pre style={{
            minWidth: '300px',
            minHeight: '25px',
            background: 'hsl(230, 1%, 98%)', // Custom color
            padding: '1em',
            borderRadius: '5px',
            border: '1px solid #ddd',
            overflowX: 'auto',
            ...codeStyle
          }}>
          <code ref={codeRef} className={`language-${language}`} style={{
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            ...codeStyle
          }}>{formattedCodeSnippet}</code>
        </pre>
        {loading && (
          <animated.div style={{...fadeLoading, borderRadius: '5px'}} className="absolute inset-0 flex flex-col items-center justify-center bg-cyan-500 bg-opacity-70">
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