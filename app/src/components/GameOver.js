// app/src/components/GameOver.js

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, writeBatch, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import GameHistory from './GameHistory';
import FinalScore from './FinalScore';
import { Button } from "@nextui-org/react";
import IncorrectReview from './IncorrectReview';

// Include longestStreak and incorrectAnswers in the GameOver component's props
const GameOver = ({ score, questionsAnswered, db, gameId, userId, longestStreak, incorrectAnswers, currentStreak }) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leaderboardName, setLeaderboardName] = useState('');

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
      console.error(`Error fetching game history for gameId: ${gameId} and userId: ${userId}`, error);
      setError(`Failed to load game history for gameId: ${gameId} and userId: ${userId}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameHistory();
  }, [db, gameId, userId]);

  const fetchLeaderboardName = async () => {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
    if (userData && userData.leaderboardName) {
      return userData.leaderboardName;
    } else {
      const inputName = prompt('Please enter your leaderboard name:');
      if (inputName) {
        await updateDoc(userDocRef, { leaderboardName: inputName });
        return inputName;
      }
    }
    return null;
  };

  const getAndIncrementGameNumber = async () => {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    // If it's the first game, the gameNumber would be 1
    const gameNumber = (userData?.gameCount || 0) + 1;

    // Increment the game count in the user's document
    await updateDoc(userRef, {
      gameCount: gameNumber
    });

    return gameNumber;
  };

  const saveGameStatsToHistory = async () => {
    console.log('saveGameStatsToHistory called, currentStreak:', currentStreak);
    if (currentStreak === undefined) {
      console.error('currentStreak is undefined');
      return;
    }

    const gameNumber = await getAndIncrementGameNumber();
    const leaderboardName = await fetchLeaderboardName();
  
    // Check if the current streak is greater than the longest streak
    if (currentStreak > longestStreak) {
      setLongestStreak(currentStreak);
    }
  
    const gameStats = {
      gameId,
      leaderboardName,
      score,
      questionsAnswered,
      longestStreak,
      sharedAt: new Date(),
      gameNumber,
    };
  
    const gameDocRef = doc(db, 'users', userId, 'games', gameId);
    await setDoc(gameDocRef, gameStats, { merge: true });
  
    return gameStats;
  };

  useEffect(() => {
    console.log('GameOver received new props, currentStreak:', currentStreak);
    saveGameStatsToHistory();
  }, [currentStreak]);

  const createShareDocument = async (finalLeaderboardName) => {
    const shareId = `${finalLeaderboardName}_${Date.now()}`;
    const shareCollectionRef = collection(db, 'sharedResults');
    const shareDocRef = doc(shareCollectionRef, shareId);
    const batch = writeBatch(db);

    const gameStats = await saveGameStatsToHistory();

    await batch.set(shareDocRef, gameStats);

    return { shareId, shareDocRef, batch };
  };

  const addHistoryToSharedDocument = async (shareDocRef, batch) => {
    const historyCollectionRef = collection(db, 'users', userId, 'games', gameId, 'history');
    const querySnapshot = await getDocs(historyCollectionRef);
    querySnapshot.forEach((historyDoc) => {
      const historyData = historyDoc.data();
      const historyDocRef = doc(shareDocRef, 'history', historyDoc.id);
      batch.set(historyDocRef, historyData);
    });
  };

  const generateShareLink = async (shareId) => {
    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/results?shareId=${shareId}`;
    await navigator.clipboard.writeText(shareLink);
    alert(`Your results are shared with ID: ${shareId}. The link has been copied to your clipboard.`);
  };

  const handleShareResults = async () => {
    if (!gameId || !userId) {
      console.error('Cannot share results because gameId or userId is not set:', { gameId, userId });
      return;
    }

    setLoading(true);
    setError('');

    try {
      let finalLeaderboardName = leaderboardName || await fetchLeaderboardName();
      if (!finalLeaderboardName) {
        setLoading(false);
        return;
      }
      setLeaderboardName(finalLeaderboardName);

      const { shareId, shareDocRef, batch } = await createShareDocument(finalLeaderboardName);
      await addHistoryToSharedDocument(shareDocRef, batch);
      await batch.commit();
      console.log('Batch committed');

      await generateShareLink(shareId);
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
        <FinalScore score={score} questionsAnswered={questionsAnswered} sharedAt={new Date()} />
        <IncorrectReview incorrectAnswers={incorrectAnswers} />
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