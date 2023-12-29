import '/style.css';
import '/tailwind.css';
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}