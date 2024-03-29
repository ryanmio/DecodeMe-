// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way." />
          <meta name="keywords" content="coding,game,learning,interactive,fun" />
          <meta property="og:url" content="https://decodeme.app" />
          <meta property="og:site_name" content="DecodeMe!" />
          <meta property="og:image" content="https://decodeme.app/images/shareimage.png" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@DecodeMe" />
          <meta name="twitter:title" content="DecodeMe!" />
          <meta name="twitter:description" content="DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way." />
          <meta name="twitter:image" content="https://decodeme.app/images/shareimage.png" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument