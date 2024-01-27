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

  if (!playSimilar || !selectedScript) {
    return null;
  }

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
          <h5>The user has requested to use this code snippet as an example:</h5>
          {selectedScript.question ? (
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              <pre style={{
                background: '#f6f8fa',
                padding: '0.5rem',
                borderRadius: '6px',
                maxWidth: '250px', // Set a max-width for the code block
                whiteSpace: 'pre-wrap', // Allow text to wrap
                wordBreak: 'break-word', // Break words at the end of the line
                fontSize: '0.875rem'
              }}>
                <code>{selectedScript.question}</code>
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