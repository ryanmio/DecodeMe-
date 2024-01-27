import { Popover, PopoverTrigger, PopoverContent, Chip } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

const CustomInstructionsIndicator = () => {
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

  if (!playSimilar || !selectedScript) {
    return null;
  }

  // Use the formatCodeSnippet function to format the selectedScript.question
  const formattedCode = formatCodeSnippet(selectedScript.question);

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
          <strong style={{ fontSize: '1rem' }}>Active Instructions</strong>
          <h5 style={{
            maxWidth: '250px', // Set a max-width for the header
            wordBreak: 'break-word' // Break words at the end of the line
          }}>
            The user has requested to use this code snippet as an example:
          </h5>
          {formattedCode ? (
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              <pre style={{
                background: '#f6f8fa',
                padding: '0.5rem',
                borderRadius: '6px',
                maxWidth: '250px', // Ensure the code block does not exceed this width
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: '0.875rem'
              }}>
                <code>{formattedCode}</code>
              </pre>
            </div>
          ) : (
            <p>No custom instructions found.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomInstructionsIndicator;