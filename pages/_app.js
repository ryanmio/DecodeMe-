// pages/_app.js
import '/style.css';
import '/tailwind.css';
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../contexts/AuthContext';
import { SoundProvider } from '../contexts/SoundContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { GoogleAnalytics } from "nextjs-google-analytics";
import { GameProvider } from '../contexts/GameContext'; // Import GameProvider

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SoundProvider>
        <GameProvider> 
          <NextUIProvider>
            <GoogleAnalytics trackPageViews />
            <Toaster position="top-right" />
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </NextUIProvider>
        </GameProvider>
      </SoundProvider>
    </AuthProvider>
  );
}
