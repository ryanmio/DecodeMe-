import Head from 'next/head'; // import Head
import '/style.css';
import '/tailwind.css';

import { NextUIProvider } from "@nextui-org/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}