// pages/_app.js
import 'prismjs/themes/prism.css';
import '../prism-one-light.css';
import '/tailwind.css';
import '/style.css';
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../contexts/AuthContext';
import { SoundProvider } from '../contexts/SoundContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { GoogleAnalytics } from "nextjs-google-analytics";
import LoadingIcon from '../components/LoadingIcon';
import { useState, useEffect } from 'react';
import Router from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <AuthProvider>
      <SoundProvider>
        <NextUIProvider>
          <GoogleAnalytics trackPageViews />
          <Toaster position="top-right" />
          <ErrorBoundary>
            {isLoading && <LoadingIcon />}
            <Component {...pageProps} />
          </ErrorBoundary>
        </NextUIProvider>
      </SoundProvider>
    </AuthProvider>
  );
}
