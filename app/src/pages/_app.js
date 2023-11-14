import '../globals.css'
import '../style.css';
import '../tailwind.css';

import { NextUIProvider } from "@nextui-org/react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}