// layout.js
import PropTypes from 'prop-types'

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export const metadata = {
  title: 'DecodeMe!',
  description: 'DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way.',
  keywords: ['coding', 'game', 'learning', 'interactive', 'fun'],
  openGraph: {
    title: 'DecodeMe!',
    description: 'DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way.',
    url: 'https://deocdeme.app',
    siteName: 'DecodeMe!',
    images: [
      {
        url: 'https://deocdeme.app/images/shareimage.jpeg',
        width: 800,
        height: 600,
        alt: 'DecodeMe! Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@DecodeMe',
    title: 'DecodeMe!',
    description: 'DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way.',
    image: 'https://deocdeme.app/images/shareimage.jpeg',
  },
}
