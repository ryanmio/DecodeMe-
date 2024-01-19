// pages/_error.js
import React, { useEffect } from 'react';
import { event } from "nextjs-google-analytics";
import CustomError from '../components/CustomError';

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

  // Use the CustomError component instead of the default Error component
  return <CustomError statusCode={statusCode} />;
}

MyError.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode || 500 : 404;

  // Log the error to Google Analytics on the server side
  // Note: Ensure that the event function is suitable for server-side usage or use an alternative method
  if (err && res) {
    // Check if we are in the browser environment
    if (typeof window !== 'undefined') {
      event("exception", {
        description: `${err.message} (status: ${statusCode})`,
        fatal: true,
      });
    }
  }

  return { statusCode, err };
};

export default MyError;
