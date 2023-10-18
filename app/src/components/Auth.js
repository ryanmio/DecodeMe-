import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFirebaseAuth } from '../firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Auth({ onUserAuth }) {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Inside useEffect in Auth component...");
    setIsClient(true);
    const auth = getFirebaseAuth();
    console.log(auth);
    
    if (auth) {
      console.log("Firebase Auth instance acquired in Auth component...");
      const unsubscribe = onAuthStateChanged(auth, user => {
        onUserAuth(user);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      console.error("Failed to acquire Firebase Auth instance in Auth component.");
    }
  }, []);

  const handleAuthentication = (authMethod) => {
    console.log("Handling authentication...");
    setLoading(true);
    authMethod()
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const signUp = () => {
    const auth = getFirebaseAuth();
    handleAuthentication(() => createUserWithEmailAndPassword(auth, email, password));
  };
  
  const signIn = () => {
    const auth = getFirebaseAuth();
    handleAuthentication(() => signInWithEmailAndPassword(auth, email, password));
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