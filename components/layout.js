// layout.js
import PropTypes from 'prop-types'
import Head from 'next/head'

export default function RootLayout({ children }) {
  return (
    <div>
      <Head>
        <title>DecodeMe!</title>
        <meta name="description" content="DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way." />
        <meta name="keywords" content="coding,game,learning,interactive,fun" />
        <meta property="og:title" content="DecodeMe!" />
        <meta property="og:description" content="DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way." />
        <meta property="og:url" content="https://deocdeme.app" />
        <meta property="og:site_name" content="DecodeMe!" />
        <meta property="og:image" content="https://deocdeme.app/images/shareimage.jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@DecodeMe" />
        <meta name="twitter:title" content="DecodeMe!" />
        <meta name="twitter:description" content="DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way." />
        <meta name="twitter:image" content="https://deocdeme.app/images/shareimage.jpeg" />
      </Head>
      {children}
    </div>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
