import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, metadata = {} }) {
  const defaultMetadata = {
    title: 'Default Title',
    description: 'Default Description',
    image: 'Default Image URL',
    url: 'Default URL',
    // Add other default values as needed
  };

  const finalMetadata = { ...defaultMetadata, ...metadata };

  return (
    <>
      <Head>
        <title>{finalMetadata.title}</title>
        <meta name="description" content={finalMetadata.description} />
        <meta property="og:title" content={finalMetadata.title} />
        <meta property="og:description" content={finalMetadata.description} />
        <meta property="og:image" content={finalMetadata.image} />
        <meta property="og:url" content={finalMetadata.url} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Other SEO-related tags here */}
      </Head>
      <div className={inter.className}>{children}</div>
    </>
  )
}
