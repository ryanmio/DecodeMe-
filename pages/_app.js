// pages/_app.js
import '/style.css';
import '/tailwind.css';
import Script from 'next/script';
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NextUIProvider>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* End Google Analytics */}
        <Toaster position="top-right" />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </NextUIProvider>
    </AuthProvider>
  );
}