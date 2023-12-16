// utils/firebaseAdmin.js
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if it hasn't been initialized yet
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY, // No need for replace here if newlines are correctly formatted
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
  }

const db = admin.firestore();
export default db;
