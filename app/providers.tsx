import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { GameStateProvider } from './src/contexts/GameStateContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <GameStateProvider>
        {children}
      </GameStateProvider>
    </NextUIProvider>
  );
}