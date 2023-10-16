'use client';

import { useState } from 'react';
import firebase from '../firebase';

export default function Auth() {
  // This marks the component as a Client Component
  if (typeof window === 'undefined') return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User registered
        var user = userCredential.user;
      })
      .catch((error) => {
        // Handle errors
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  const signIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in
        var user = userCredential.user;
      })
      .catch((error) => {
        // Handle errors
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}