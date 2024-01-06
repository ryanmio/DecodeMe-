import '/style.css';
import '/tailwind.css';
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../contexts/AuthContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NextUIProvider>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </NextUIProvider>
    </AuthProvider>
  );
}