// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <title>DecodeMe!</title>
          <meta name="description" content="DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way." />
          <meta name="keywords" content="coding,game,learning,interactive,fun" />
          <meta property="og:description" content="DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way." />
          <meta property="og:url" content="https://decodeme.app" />
          <meta property="og:site_name" content="DecodeMe!" />
          <meta property="og:image" content="https://decodeme.app/images/shareimage.jpeg" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@DecodeMe" />
          <meta name="twitter:title" content="DecodeMe!" />
          <meta name="twitter:description" content="DecodeMe! is a web-based game that helps players understand code snippets in a fun and interactive way." />
          <meta name="twitter:image" content="https://decodeme.app/images/shareimage.jpeg" />
          <link rel="icon" href="/favicon.ico" />
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