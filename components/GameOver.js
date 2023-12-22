// components/GameOver.js
import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, writeBatch, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import GameHistory from './GameHistory';
import FinalScore from './FinalScore';
import { Button } from "@nextui-org/react";
import IncorrectReview from './IncorrectReview';
import PostGameMessage from './PostGameMessage';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const GameOver = ({ score, questionsAnswered, db, gameId, userId, longestStreak, incorrectAnswers, currentStreak, handleChatWithTutor, selectedScript }) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leaderboardName, setLeaderboardName] = useState('');

  const getHistoryCollectionRef = (db, userId, gameId) => {
    return collection(db, 'users', userId, 'games', gameId, 'history');
  };

  const fetchGameHistory = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const historyCollectionRef = getHistoryCollectionRef(db, userId, gameId);
      const querySnapshot = await getDocs(historyCollectionRef);
      const historyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort the history data by timestamp in ascending order
      const sortedHistoryData = historyData.sort((a, b) => a.timestamp - b.timestamp);

      setGameHistory(sortedHistoryData);
    } catch (error) {
      setError(`Failed to load game history for gameId: ${gameId} and userId: ${userId}`);
    } finally {
      setLoading(false);
    }
  }, [db, gameId, userId]);

  useEffect(() => {
    fetchGameHistory();
  }, [fetchGameHistory]);

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
    const gameNumber = (userData?.gameCount || 0) + 1;

    // Increment the game count in the user's document
    await updateDoc(userRef, {
      gameCount: gameNumber
    });

    return gameNumber;
  };

  const saveGameStatsToHistory = useCallback(async () => {
    if (currentStreak === undefined) {
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
  }, [currentStreak, gameId, leaderboardName, score, questionsAnswered, longestStreak, db, userId]);

  useEffect(() => {
    saveGameStatsToHistory();
  }, [saveGameStatsToHistory]);

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
    const historyCollectionRef = getHistoryCollectionRef(db, userId, gameId);
    const querySnapshot = await getDocs(historyCollectionRef);
    querySnapshot.forEach((historyDoc) => {
      const historyData = historyDoc.data();
      const historyDocRef = doc(shareDocRef, 'history', historyDoc.id);
      batch.set(historyDocRef, historyData);
    });
  };

  const generateShareLink = async (shareId) => {
    const shareLink = `${APP_URL}/results?shareId=${shareId}`;
    await navigator.clipboard.writeText(shareLink);
    alert(`Your results are shared with ID: ${shareId}. The link has been copied to your clipboard.`);
  };

  const handleShareResults = async () => {
    setError('');
    setLoading(true);

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

      await generateShareLink(shareId);
    } catch (error) {
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
        <PostGameMessage db={db} userId={userId} score={score} incorrectAnswers={incorrectAnswers} gameHistory={gameHistory} />
        <IncorrectReview incorrectAnswers={incorrectAnswers} onChatWithTutor={handleChatWithTutor} />
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
