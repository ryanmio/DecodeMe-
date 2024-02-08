// components/ShareGameLink.js
import React from 'react';
import { Snippet } from '@nextui-org/react';
import toast from 'react-hot-toast';

const ShareGameLink = ({ url }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(url); // Use the Clipboard API to copy the text
    toast.success('Link copied to clipboard!');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontSize: '0.8rem', 
      marginTop: '1rem',
      maxWidth: '600px', // Set the maximum width for the entire component
      width: '100%', // Ensure the component width is responsive
    }}>
      <Snippet text={url} symbol="" onCopy={handleCopy} width="100%" color="primary">
        <span style={{
          maxWidth: 'calc(100% - 40px)', // Adjust the maxWidth to leave space for the copy button
          display: 'inline-block', // Use inline-block for proper width application
          overflow: 'hidden', // Hide the overflow
          textOverflow: 'ellipsis', // Show ellipsis for overflow
          whiteSpace: 'nowrap', // Keep the URL in a single line
          verticalAlign: 'bottom' // Align the text with the copy button
        }}>
          {url}
        </span>
      </Snippet>
    </div>
  );
};

export default ShareGameLink;