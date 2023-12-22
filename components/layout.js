// layout.js
import Head from 'next/head'
import PropTypes from 'prop-types'

export default function RootLayout({ children, metadata }) {
  const defaultMetadata = {
    title: 'Simplified Title',
    description: '',
    image: '',
    url: '',
  };

  const finalMetadata = defaultMetadata;

  return (
    <div>
      <Head>
        <title key="title">{finalMetadata.title}</title>
        {/* Add other meta tags here with unique keys */}
      </Head>
      {children}
    </div>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.shape({
    title: PropTypes.string,
  }),
}

RootLayout.defaultProps = {
  metadata: {
    title: 'Simplified Title',
    description: '',
    image: '',
    url: '',
  },
}
