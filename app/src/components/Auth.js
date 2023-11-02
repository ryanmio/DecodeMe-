import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFirebaseAuth } from '../firebase';
import { onAuthStateChanged, signInAnonymously, linkWithCredential, EmailAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Auth({ onUserAuth }) {
  const [isClient, setIsClient] = useState(false);
  const [leaderboardName, setLeaderboardName] = useState('');
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

  const handleAnonymousSignIn = () => {
    setLoading(true);
    const auth = getFirebaseAuth();
    signInAnonymously(auth)
      .then((userCredential) => {
        // Store leaderboard name in user's local state or Firestore
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

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
      <input 
        type="text" 
        value={leaderboardName} 
        onChange={(e) => setLeaderboardName(e.target.value)} 
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        placeholder="Leaderboard Name"
      />
      <button onClick={handleAnonymousSignIn} disabled={loading} className="w-full px-4 py-2 bg-blue-500 text-white rounded mb-2">Play as Guest</button>
      <div className="w-full border-b border-gray-300 my-4"></div>
      <p className="text-gray-500 mb-2 text-sm">Or sign in with your email</p>
      <div className="flex flex-col space-y-2">
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          placeholder="Email"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          placeholder="Password"
        />
        <button onClick={signIn} disabled={loading} className="w-full px-2 py-1 bg-blue-500 text-white rounded text-sm">Sign In</button>
        <button onClick={signUp} disabled={loading} className="w-full px-2 py-1 bg-blue-500 text-white rounded text-sm">Create Account</button>
      </div>
      {loading && <p className="mt-2 text-sm">Loading...</p>}
      {error && <p className="mt-2 text-red-500 text-sm">Error: {error}</p>}
    </div>
  );
}

Auth.propTypes = {
  onUserAuth: PropTypes.func.isRequired,
};
