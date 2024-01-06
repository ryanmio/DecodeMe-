// components/Auth.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { signInAnonymously, linkWithCredential, EmailAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getFirebaseFirestore, getFirebaseAuth } from '../app/src/firebase';
import { toast } from 'react-hot-toast';

const firebaseAuthErrorCodes = {
  'auth/email-already-in-use': 'The email address is already in use.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No user found with this email.',
  'auth/wrong-password': 'Wrong password.',
  'auth/invalid-email': 'Hmm... email address is not valid...',
  'auth/operation-not-allowed': 'Operation not allowed.',
  'auth/weak-password': 'Your password is too weak. 💪',
};

export default function Auth({ onUserAuth, onLeaderboardNameSet }) {
  const [leaderboardName, setLeaderboardName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const db = getFirebaseFirestore();
  const auth = getFirebaseAuth();

  const handleAnonymousSignIn = async () => {
    setLoading(true);
    if (!leaderboardName) {
      setError('Please enter a leaderboard name.');
      toast.error('Please enter a leaderboard name.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { user } = await signInAnonymously(auth);
      await setDoc(doc(db, 'users', user.uid), { isAnonymous: true, leaderboardName });
      onUserAuth(user);
      onLeaderboardNameSet(leaderboardName);
      setError(null); // clear the error state
    } catch (error) {
      console.error(error);
      const message = firebaseAuthErrorCodes[error.code] || 'Failed to sign in anonymously.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthentication = async (authMethod) => {
    setLoading(true);
    try {
      return await authMethod();
    } catch (error) {
      console.error(error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (!email || !password) {
      toast.error('Please enter your email and a password to create an account.');
      setLoading(false); // set loading to false in error scenario
      return;
    }
    setLoading(true);
    try {
      const { user } = await handleAuthentication(() => createUserWithEmailAndPassword(auth, email, password));
      await setDoc(doc(db, 'users', user.uid), { email });
    } catch (error) {
      console.error(error);
      const message = firebaseAuthErrorCodes[error.code] || 'An unknown error occurred.';
      toast.error(message);
    }
  };

  const signIn = async () => {
    if (!email || !password) {
      toast.error('Please enter your email and password.');
      return;
    }
    try {
      await handleAuthentication(() => signInWithEmailAndPassword(auth, email, password));
    } catch (error) {
      console.error(error);
      const message = firebaseAuthErrorCodes[error.code] || 'An unknown error occurred.';
      toast.error(message);
    }
  };

  const handleUpgradeAccount = async () => {
    setLoading(true);
    if (auth.currentUser) {
      try {
        const credential = EmailAuthProvider.credential(email, password);
        const { user } = await linkWithCredential(auth.currentUser, credential);
        const oldDocRef = doc(db, 'guests', user.uid);
        const newDocRef = doc(db, 'users', user.uid);
        const docData = (await oldDocRef.get()).data();
        if (docData) {
          await setDoc(newDocRef, docData);
          await deleteDoc(oldDocRef);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

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
      <p className="text-gray-500 mb-2 text-sm">Or sign in to save your progress</p>
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
    </div>
  );
}

Auth.propTypes = {
  onUserAuth: PropTypes.func.isRequired,
  onLeaderboardNameSet: PropTypes.func.isRequired,
};

