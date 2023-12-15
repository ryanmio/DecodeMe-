// app/src/utils/firebaseAdmin.js
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Uncomment the following line if you are using Firebase Realtime Database
      // databaseURL: 'https://decodeme-1f38e-default-rtdb.firebaseio.com'
    });
  } catch (error) {
    // In production, you might want to log this error to an error reporting service instead
    console.error('Firebase admin initialization error', error);
  }
}

export default admin.firestore();