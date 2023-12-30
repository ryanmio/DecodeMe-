// components/LinkAccount.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { signInWithEmailAndPassword, linkWithCredential, GithubAuthProvider } from 'firebase/auth';
import { getFirebaseAuth } from '../app/src/firebase';

export default function LinkAccount({ credential, onUserAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const auth = getFirebaseAuth();

  const handleLinkAccount = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await linkWithCredential(result.user, credential);
      onUserAuth(result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-4">
      <h2>Link Account to GitHub</h2>
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
      <button onClick={handleLinkAccount} className="w-full px-2 py-1 bg-blue-500 text-white rounded text-sm">Link Account</button>
      {error && <p className="mt-2 text-sm">{error}</p>}
    </div>
  );
}

LinkAccount.propTypes = {
  credential: PropTypes.instanceOf(GithubAuthProvider.credential.constructor).isRequired,
  onUserAuth: PropTypes.func.isRequired,
};