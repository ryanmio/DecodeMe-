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
    setIsClient(true);
    const auth = getFirebaseAuth();
    
    if (auth) {
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
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Sign In / Sign Up</h1>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        placeholder="Password"
      />
      <button onClick={signUp} disabled={loading} className="w-full px-4 py-2 bg-blue-500 text-white rounded mb-2">Sign Up</button>
      <button onClick={signIn} disabled={loading} className="w-full px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
    </div>
  );
}

Auth.propTypes = {
  onUserAuth: PropTypes.func.isRequired,
};