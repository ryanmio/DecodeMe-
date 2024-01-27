import { Popover, PopoverTrigger, PopoverContent, Chip } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CustomInstructionsIndicator = ({ customInstructions }) => {
  const [visible, setVisible] = useState(false);
  const [playSimilar, setPlaySimilar] = useState(false);
  const [selectedScript, setSelectedScript] = useState(null);

  useEffect(() => {
    // Access localStorage only on the client-side
    if (typeof window !== 'undefined') {
      const playSimilarValue = localStorage.getItem('playSimilar') === 'true';
      const script = localStorage.getItem('selectedScriptForSimilarGame');
      setPlaySimilar(playSimilarValue);
      setSelectedScript(script ? JSON.parse(script) : null);
    }
  }, []);

  useEffect(() => {
    const handleStorageCleared = () => {
      setPlaySimilar(false);
      setSelectedScript(null);
    };

    window.addEventListener('storageCleared', handleStorageCleared);

    return () => {
      window.removeEventListener('storageCleared', handleStorageCleared);
    };
  }, []);

  // Function to format the code snippet
  const formatCodeSnippet = (code) => {
    return code?.replace(/```python\n|```python|```/g, '').trim() || '';
  };

  // Determine if there are any custom instructions for codegen or chat
  const hasCustomInstructions = customInstructions.codeGen || customInstructions.chatbot;

  // Adjust the condition to render the chip if playSimilar is true or if there are custom instructions
  if (!playSimilar && !hasCustomInstructions) {
    return null;
  }

  // Use the formatCodeSnippet function to format the selectedScript.question if selectedScript is not null
  const formattedCode = selectedScript ? formatCodeSnippet(selectedScript.question) : '';

  // Use the existing formatCodeSnippet function to format the custom instructions for codegen and chat
  const formattedCodegenInstructions = formatCodeSnippet(customInstructions.codeGen);
  const formattedChatInstructions = formatCodeSnippet(customInstructions.chatbot);

  // Define a common style for both sections
  const commonPreStyle = {
    background: '#f6f8fa',
    padding: '1rem',
    borderRadius: '6px',
    maxWidth: '250px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '0.875rem',
    margin: '0',
  };

  return (
    <Popover isOpen={visible} onOpenChange={setVisible} placement="right" showArrow={true}>
      <PopoverTrigger>
        <Chip
          variant="flat"
          color="primary"
          onClick={() => setVisible(true)}
          css={{ cursor: 'pointer', ':hover': { opacity: 0.8 } }}
        >
          Custom Instructions
        </Chip>
      </PopoverTrigger>
      <PopoverContent css={{ maxWidth: '300px' }}>
        <div style={{ padding: '1rem' }}>
          <strong style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            display: 'block'
          }}>
            Active Instructions
          </strong>
          {playSimilar && formattedCode && (
            <>
              <h5 style={{
                maxWidth: '250px',
                wordBreak: 'break-word'
              }}>
                The user has requested to use this code snippet as an example:
              </h5>
              <div style={{ maxHeight: '100px', overflowY: 'auto', marginBottom: '1rem' }}>
                <pre style={commonPreStyle}>
                  <code>{formattedCode}</code>
                </pre>
              </div>
            </>
          )}
          {formattedCodegenInstructions && (
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ fontSize: '1rem' }}>Gameplay Instructions</strong>
              <pre style={commonPreStyle}>
                <code>{formattedCodegenInstructions}</code>
              </pre>
            </div>
          )}
          {formattedChatInstructions && (
            <div>
              <strong style={{ fontSize: '1rem' }}>Assistant Instructions</strong>
              <pre style={commonPreStyle}>
                <code>{formattedChatInstructions}</code>
              </pre>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

CustomInstructionsIndicator.propTypes = {
  customInstructions: PropTypes.shape({
    codeGen: PropTypes.string,
    chatbot: PropTypes.string,
  }),
};

export default CustomInstructionsIndicator;