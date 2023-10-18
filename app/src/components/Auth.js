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
    const firebaseInstance = getFirebase();
    if (firebaseInstance) {
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
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }} 
        placeholder="Password"
      />
      <button onClick={signUp} disabled={loading} style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }}>Sign Up</button>
      <button onClick={signIn} disabled={loading} style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }}>Sign In</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

Auth.propTypes = {
  onUserAuth: PropTypes.func.isRequired,
};
