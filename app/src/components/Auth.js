'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFirebase } from '../firebase';

export default function Auth({ onUserAuth }) {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const firebaseInstance = getFirebase(); // get the instance on-demand
    if (firebaseInstance && firebaseInstance.apps.length > 0) {
      const unsubscribe = firebaseInstance.auth().onAuthStateChanged(user => {
        onUserAuth(user);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  const signUp = () => {
    setLoading(true);
    const firebaseInstance = getFirebase();
    firebaseInstance.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const signIn = () => {
    setLoading(true);
    const firebaseInstance = getFirebase();
    firebaseInstance.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signUp} disabled={loading}>Sign Up</button>
      <button onClick={signIn} disabled={loading}>Sign In</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

Auth.propTypes = {
  onUserAuth: PropTypes.func.isRequired,
};
