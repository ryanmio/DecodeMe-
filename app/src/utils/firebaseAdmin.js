// app/src/utils/firebaseAdmin.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
};

let app;

// Check if a Firebase instance doesn't exist, then initialize
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export default db;
