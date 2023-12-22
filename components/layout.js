// layout.js
import Head from 'next/head'
import PropTypes from 'prop-types'

export default function RootLayout({ children, metadata }) {
  const defaultMetadata = {
    title: 'Default Title',
    description: 'Default Description',
    image: '/images/shareimage.jpeg',
    url: 'Default URL',
  };

  const finalMetadata = { ...defaultMetadata, ...metadata };

  return (
    <div>
      <Head>
        <title>{finalMetadata.title}</title>
        <meta name="description" content={finalMetadata.description} />
        <meta property="og:title" content={finalMetadata.title} />
        <meta property="og:description" content={finalMetadata.description} />
        <meta property="og:image" content={finalMetadata.image} />
        <meta property="og:url" content={finalMetadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children}
    </div>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
  }),
}

RootLayout.defaultProps = {
  metadata: {
    title: 'Default Title',
    description: 'Default Description',
    image: '/images/shareimage.jpeg',
    url: 'Default URL',
  },
}