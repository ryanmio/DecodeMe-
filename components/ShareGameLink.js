// components/ShareGameLink.js
import React from 'react';
import { Snippet } from '@nextui-org/react';
import toast from 'react-hot-toast';

const ShareGameLink = ({ url }) => {
  console.log('Rendering ShareGameLink with url:', url); // Log when the component is rendered with the url

  const handleCopy = () => {
    console.log('Link copied to clipboard:', url); // Log when the link is copied
    toast.success('Link copied to clipboard!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '0.8rem', marginTop: '1rem' }}>
      <Snippet text={url} symbol="" onCopy={handleCopy} width="100%" color="primary">
        {url}
      </Snippet>
    </div>
  );
};

export default ShareGameLink;