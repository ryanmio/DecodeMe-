// pages/404.js
import React from 'react';
import { NextUIProvider, Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Custom404() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <NextUIProvider>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">404 - Page Not Found</h1>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleHomeClick}>Home</Button>
              <Button onClick={handleBackClick}>Back</Button>
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}