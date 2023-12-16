// utils/firebaseClient.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
