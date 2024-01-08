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

export default function Auth({ onUserAuth, onLeaderboardNameSet, formMode, setFormMode }) {
  const [leaderboardName, setLeaderboardName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const db = getFirebaseFirestore();
  const auth = getFirebaseAuth();

  const handleFormModeChange = (mode) => {
    setFormMode(mode);
  };

  const getPlayButtonText = () => {
    switch (formMode) {
      case 'guest':
        return 'Play as Guest';
      case 'signIn':
        return 'Sign In';
      case 'createAccount':
        return `Create Account`;
      default:
        return 'Play';
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    switch (formMode) {
      case 'guest':
        if (!leaderboardName) {
          setError('Please enter a leaderboard name.');
          toast.error('Please enter a leaderboard name.');
          setLoading(false);
          return;
        }

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
        break;

      case 'signIn':
        if (!email || !password) {
          toast.error('Please enter your email and password.');
          setLoading(false);
          return;
        }
        signIn(); // Call the signIn function directly
        break;

      case 'createAccount':
        if (!email || !password || !leaderboardName) {
          toast.error('Please enter your email, password, and leaderboard name to create an account.');
          setLoading(false);
          return;
        }
        signUp();
        break;
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
    try {
      await handleAuthentication(() => signInWithEmailAndPassword(auth, email, password));
    } catch (error) {
      console.error(error);
      const message = firebaseAuthErrorCodes[error.code] || 'An unknown error occurred.';
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4">
      {formMode !== 'signIn' && (
        <input
          type="text"
          value={leaderboardName}
          onChange={(e) => setLeaderboardName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
          placeholder="Leaderboard Name"
        />
      )}
      {formMode !== 'guest' && (
        <>
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
        </>
      )}
      <button onClick={handleSubmit} disabled={loading} className="w-full px-4 py-2 bg-blue-500 text-white rounded mb-2">
        {getPlayButtonText()}
      </button>
      {formMode === 'guest' && (
        <>
          <div className="w-full border-b border-gray-300 my-4"></div>
          <p className="text-gray-500 mb-2 text-sm">To save your progress:</p>
          <div className="flex flex-row space-x-2">
            <button onClick={() => handleFormModeChange('signIn')} className="px-3 py-2 bg-blue-500 text-white rounded text-sm">Sign In</button>
            <button onClick={() => handleFormModeChange('createAccount')} className="px-3 py-2 bg-blue-500 text-white rounded text-sm">Create Account</button>
          </div>
        </>
      )}
    </div>
  );
}

Auth.propTypes = {
  onUserAuth: PropTypes.func.isRequired,
  onLeaderboardNameSet: PropTypes.func.isRequired,
  formMode: PropTypes.string.isRequired,
  setFormMode: PropTypes.func.isRequired,
};