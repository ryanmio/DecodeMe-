import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, writeBatch } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { CodeBlock, dracula } from 'react-code-blocks';

const GameOver = ({ score, questionLimit, db, gameId, userId }) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formatCodeSnippet = (code) => code.replace(/```python\n|```python|```/g, '').trim();

  useEffect(() => {
    const fetchGameHistory = async () => {
      if (!gameId || !userId) {
        console.error('gameId or userId is not set:', { gameId, userId });
        return;
      }

      setLoading(true);
      try {
        const historyCollectionRef = collection(db, 'users', userId, 'games', gameId, 'history');
        const querySnapshot = await getDocs(historyCollectionRef);
        const historyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGameHistory(historyData);
      } catch (error) {
        console.error('Error fetching game history:', error);
        setError('Failed to load game history.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameHistory();
  }, [db, gameId, userId]);

  const handleShareResults = async () => {
    if (!gameId || !userId) {
      console.error('Cannot share results because gameId or userId is not set:', { gameId, userId });
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Generate a unique identifier for the share
      const shareId = `${userId}_${Date.now()}`;

      // Start a batch
      const batch = writeBatch(db);

      // Reference to the user's game history
      const historyCollectionRef = collection(db, 'users', userId, 'games', gameId, 'history');

      // Fetch the user's game history
      const querySnapshot = await getDocs(historyCollectionRef);

      // Reference to the public share collection
      const shareCollectionRef = collection(db, 'sharedResults');

      // Create a new document for sharing with the generated unique identifier
      const shareDocRef = doc(shareCollectionRef, shareId);
      batch.set(shareDocRef, {
        gameId,
        userId,
        score,
        questionLimit,
        sharedAt: new Date(),
      });

      // Add each history item to the shared document
      querySnapshot.forEach((historyDoc) => {
        const historyData = historyDoc.data();
        // We use `doc` function to create a reference to a new document inside the shared document
        const historyDocRef = doc(shareDocRef, 'history', historyDoc.id);
        batch.set(historyDocRef, historyData);
      });
      

      // Commit the batch
      await batch.commit();

      // Provide feedback to the user that their results are shared
      alert(`Your results are shared with ID: ${shareId}`);
    } catch (error) {
      console.error('Error sharing game history:', error);
      setError('Failed to share game history.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Round over!</h2>
        <p className="text-lg">Your score is {score} out of {questionLimit}.</p>
        <button 
        onClick={handleShareResults} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        disabled={loading}
      >
        {loading ? 'Sharing...' : 'Share Results'}
      </button>
        {loading && <p>Loading game history...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="history-list">
          {gameHistory.map((entry) => (
            <li key={entry.id} className="mb-2 p-2 rounded shadow">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
                <CodeBlock
                  text={formatCodeSnippet(entry.question)}
                  language={"python"}
                  theme={dracula}
                  showLineNumbers={false}
                  wrapLines
                  codeContainerStyle={{ textAlign: 'left' }}
                />
                <span className={entry.isCorrect ? 'text-green-500' : 'text-red-500'}>
                  {entry.isCorrect ? '✔️' : '❌'}
                </span>
              </div>
              <div className="text-sm text-gray-600 italic">
                Your answer: {entry.answer}
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default GameOver;
