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

  return (
    <NextUIProvider>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-8">Page not found. The requested page could not be found.</p>
        <Button auto onClick={handleHomeClick} className="bg-blue-500 hover:bg-blue-600 text-white">
          Go back to Home
        </Button>
      </div>
    </NextUIProvider>
  );
}