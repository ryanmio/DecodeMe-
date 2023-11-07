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
            <li key={entry.id} className="mb-2 p-2 rounded shadow">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
                <span className="font-bold">Q:</span>
                <span className="text-left">{entry.question}</span>
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
