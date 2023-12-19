// layout.js
import Head from 'next/head'
import PropTypes from 'prop-types'

const defaultMetadata = {
  title: 'Default Title',
  description: 'Default Description',
  image: '/images/shareimage.jpeg',
  url: 'Default URL',
};

function RootLayout({ children, metadata }) {
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children}
    </div>
  )
}

RootLayout.defaultProps = {
  metadata: defaultMetadata
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default RootLayout;
