import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

console.log("Firebase configuration:", firebaseConfig);

let firebaseInstance;

export function getFirebase() {
  console.log("Entering getFirebase function...");
  
  if (!firebaseInstance) {
    console.log("Firebase instance is not yet initialized...");
    
    try {
      if (firebase.apps.length === 0) {
        console.log("Initializing Firebase...");
        firebaseInstance = firebase.initializeApp(firebaseConfig);
        console.log("Firebase initialized successfully!");
      } else {
        firebaseInstance = firebase.app();
        console.warn("Firebase already initialized.");
      }
    } catch (err) {
      console.error("Error during Firebase initialization or check:", err);
    }
  } else {
    console.log("Firebase instance already exists...");
  }
  
  return firebaseInstance;
}

export default firebase;