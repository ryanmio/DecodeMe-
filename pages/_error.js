// pages/_error.js
import React, { useEffect } from 'react';
import { event } from "nextjs-google-analytics";
import Error from 'next/error';

function MyError({ statusCode, err }) {
  useEffect(() => {
    // Log the error to Google Analytics only on the client side
    if (err) {
      event("exception", {
        description: `${err.message} (status: ${statusCode})`,
        fatal: true,
      });
    }
  }, [err, statusCode]);

  return <Error statusCode={statusCode} />;
}

MyError.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode || 500 : 404;

  // Log the error to Google Analytics on the server side
  if (err) {
    event("exception", {
      description: `${err.message} (status: ${statusCode})`,
      fatal: true,
    });
  }

  return { statusCode };
};

export default MyError;
