import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAtAACIrw85HlBz25WuTqGmVVUbb6MJvQ8",
  authDomain: "decodeme-1f38e.firebaseapp.com",
  projectId: "decodeme-1f38e",
  storageBucket: "decodeme-1f38e.appspot.com",
  messagingSenderId: "141094552346",
  appId: "1:141094552346:web:49fd9edc9e829f558da2a3",
  measurementId: "G-GFPBL46PKD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;