// components/SEO.js
import Head from 'next/head'

export default function SEO({ title = "Default Title", description = "Default Description", url = "https://example.com", image = "https://example.com/default.jpg" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </Head>
  )
}