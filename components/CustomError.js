// components/CustomError.js
import React from 'react';
import { NextUIProvider, Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import Head from 'next/head';

const CustomError = ({ statusCode }) => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <NextUIProvider>
      <Head>
        <title>{statusCode} - Error Occurred</title>
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-8">An error occurred...</p>
        <Button auto onClick={handleHomeClick} className="bg-blue-500 hover:bg-blue-600 text-white">
          Go back to Home
        </Button>
      </div>
    </NextUIProvider>
  );
};

export default CustomError;