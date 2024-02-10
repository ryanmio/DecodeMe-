// components/ShareGameLink.js
import React from 'react';
import { Snippet } from '@nextui-org/react';
import toast from 'react-hot-toast';

const ShareGameLink = ({ url }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontSize: '0.8rem', 
      marginTop: '1rem',
      maxWidth: '600px',
      width: '100%',
    }}>
      <Snippet text={url} symbol="" onCopy={handleCopy} width="100%" color="primary">
        <span style={{
          maxWidth: 'calc(100% - 40px)',
          display: 'inline-block',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          verticalAlign: 'bottom' 
        }}>
          {url}
        </span>
      </Snippet>
    </div>
  );
};

export default ShareGameLink;