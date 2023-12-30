// components/Auth.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged, signInAnonymously, linkWithCredential, EmailAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getFirebaseFirestore, getFirebaseAuth } from '../app/src/firebase';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export default function Auth({ onUserAuth, onLeaderboardNameSet }) {
  const [isClient, setIsClient] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [leaderboardName, setLeaderboardName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const db = getFirebaseFirestore();
  const auth = getFirebaseAuth();

  
  useEffect(() => {
    setIsClient(true);
    if (onUserAuth) {
      const unsubscribe = onAuthStateChanged(auth, user => {
        onUserAuth(user);
        setLoading(false);
        setAuthChecked(true);
      });
      return () => unsubscribe();
    }
  }, [auth, onUserAuth]);  

  const handleAnonymousSignIn = async () => {
    if (!leaderboardName) {
      setError('Please enter a leaderboard name.');
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    try {
      const { user } = await signInAnonymously(auth);
      await setDoc(doc(db, 'users', user.uid), { isAnonymous: true, leaderboardName });
      onUserAuth(user);
      onLeaderboardNameSet(leaderboardName);
    } catch (error) {
      setError('Failed to sign in anonymously.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onUserAuth(user);
    } catch (error) {
      setError(error.message);
      setShowErrorModal(true);
    }
  };

  const handleAuthentication = async (authMethod) => {
    setLoading(true);
    try {
      return await authMethod();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    const { user } = await handleAuthentication(() => createUserWithEmailAndPassword(auth, email, password));
    await setDoc(doc(db, 'users', user.uid), { email });
  };

  const signIn = async () => {
    await handleAuthentication(() => signInWithEmailAndPassword(auth, email, password));
  };

  const handleUpgradeAccount = async () => {
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

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  if (!isClient || !authChecked) {
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
        <button onClick={handleGithubSignIn} disabled={loading} className="w-full px-2 py-1 bg-blue-500 text-white rounded text-sm">Sign In with GitHub</button>
      </div>
      {loading && <p className="mt-2 text-sm">Loading...</p>}
      {error && showErrorModal && (
        <Modal isOpen={showErrorModal} onClose={closeErrorModal}>
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalBody>{error}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={closeErrorModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

Auth.propTypes = {
  onUserAuth: PropTypes.func.isRequired,
  onLeaderboardNameSet: PropTypes.func.isRequired,
};
