import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

const GameOver = ({ score, questionLimit, db, gameId, userId }) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGameHistory = async () => {
      if (!gameId || !userId) {
        console.log('gameId or userId is not set:', { gameId, userId });
        return;
      }

      setLoading(true);
      try {
        const historyCollectionRef = collection(db, 'users', userId, 'games', gameId, 'history');
        const querySnapshot = await getDocs(historyCollectionRef);
        console.log(`Fetched ${querySnapshot.docs.length} history items`);
        
        const historyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGameHistory(historyData);
      } catch (error) {
        console.error('Error fetching game history:', error);
        setError('Failed to load game history. Please try again.');
      }
      setLoading(false);
    };

    fetchGameHistory();
  }, [db, gameId, userId]);

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Round over!</h2>
        <p className="text-lg">Your score is {score} out of {questionLimit}.</p>
        {loading && <p>Loading game history...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="history-list">
          {gameHistory.map((entry) => (
            <li key={entry.id}>
              Q: {entry.question} - Your answer: {entry.answer} ({entry.isCorrect ? 'Correct' : 'Incorrect'})
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default GameOver;
