import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, doc, writeBatch, getDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import GameHistory from './GameHistory';
import FinalScore from './FinalScore';
import { Button } from "@nextui-org/react";

const GameOver = ({ score, questionLimit, db, gameId, userId }) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formatCodeSnippet = (code) => code.replace(/```python\n|```python|```/g, '').trim();
  const [leaderboardName, setLeaderboardName] = useState('');

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

         // Sort the history data by timestamp in ascending order
    const sortedHistoryData = historyData.sort((a, b) => a.timestamp - b.timestamp);

    setGameHistory(sortedHistoryData);
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
  
    let finalLeaderboardName = leaderboardName;

    try {
      // Fetch the user's leaderboard name if it's not set
      if (!finalLeaderboardName) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        if (userData && userData.leaderboardName) {
          finalLeaderboardName = userData.leaderboardName; // Use the leaderboard name directly from the user data
          setLeaderboardName(finalLeaderboardName);
        } else {
          const inputName = prompt('Please enter your leaderboard name:');
          if (inputName) {
            finalLeaderboardName = inputName; // Use the input name directly
            setLeaderboardName(finalLeaderboardName);
            // Update the leaderboard name in Firebase
            await updateDoc(userDocRef, { leaderboardName: inputName });
          } else {
            // If the user didn't enter a name, stop the function
            setLoading(false);
            return;
          }
        }
      }
  
      console.log('Leaderboard name:', finalLeaderboardName); // Use finalLeaderboardName
  
      // Generate a unique identifier for the share
      const shareId = `${finalLeaderboardName}_${Date.now()}`; // Use finalLeaderboardName
  
      // Start a batch
      const batch = writeBatch(db);
  
      // Reference to the user's game history
      const historyCollectionRef = collection(db, 'users', userId, 'games', gameId, 'history');
  
      // Fetch the user's game history
      const querySnapshot = await getDocs(historyCollectionRef);
  
      console.log('Fetched game history:', querySnapshot.docs.map(doc => doc.data())); // Added console log
  
      // Reference to the public share collection
      const shareCollectionRef = collection(db, 'sharedResults');
  
      // Create a new document for sharing with the generated unique identifier
      const shareDocRef = doc(shareCollectionRef, shareId);
      batch.set(shareDocRef, {
        gameId,
        leaderboardName: finalLeaderboardName, // Use finalLeaderboardName
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
  
      console.log('Batch committed'); // Added console log
  
      // Generate the share link
      const shareLink = `http://localhost:3000/results?shareId=${shareId}`;
  
      // Copy the share link to the clipboard
      await navigator.clipboard.writeText(shareLink);
  
      // Provide feedback to the user that their results are shared
      alert(`Your results are shared with ID: ${shareId}. The link has been copied to your clipboard.`);
    } catch (error) {
      console.error('Error sharing game history:', error);
      setError('Failed to share game history.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center w-[400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Round over!</h2>
        <FinalScore score={score} questionLimit={questionLimit} sharedAt={new Date()} />
        <GameHistory gameHistory={gameHistory} />
        <Button 
          onClick={handleShareResults} 
          radius="full" 
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          disabled={loading}
        >
          Share Results
        </Button>
        {error && <p className="text-red-500">{error}</p>}
       
      </motion.div>
    </div>
  );
};

export default GameOver;
