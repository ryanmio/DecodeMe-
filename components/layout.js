// layout.js
import React from 'react';
import PropTypes from 'prop-types';

export default function RootLayout({ children }) {
  return (
    <div>
      {/* Temporarily commented out the Head component to test its impact on SSR */}
      {/*
      <Head>
        <title>{finalMetadata.title}</title>
        <meta name="description" content={finalMetadata.description} />
        <meta property="og:title" content={finalMetadata.title} />
        <meta property="og:description" content={finalMetadata.description} />
        <meta property="og:image" content={finalMetadata.image} />
        <meta property="og:url" content={finalMetadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      */}
      {children}
    </div>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  // metadata prop is temporarily removed for testing
};

// Temporarily commented out defaultProps for metadata
// RootLayout.defaultProps = {
//   metadata: {
//     title: 'Default Title',
//     description: 'Default Description',
//     image: '/images/shareimage.jpeg',
//     url: 'Default URL',
//   },
// };
