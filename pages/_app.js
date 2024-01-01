import '/style.css';
import '/tailwind.css';
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}