// utils/firebaseAdmin.js
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

const db = admin.firestore();

async function fetchCollection(docRef, collectionName) {
  const collectionRef = docRef.collection(collectionName);
  const collectionQuery = collectionRef.orderBy('timestamp', 'desc');
  const querySnapshot = await collectionQuery.get();
  return querySnapshot.docs.map(doc => doc.data());
}

export default db;
