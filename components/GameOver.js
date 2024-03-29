// components/GameOver.js
import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, writeBatch, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { httpsCallable, getFunctions } from 'firebase/functions';
import { motion } from 'framer-motion';
import GameHistory from './GameHistory';
import FinalScore from './FinalScore';
import { Button, Spinner } from "@nextui-org/react";
import IncorrectReview from './IncorrectReview';
import PostGameMessage from './PostGameMessage';
import ShareGameLink from './ShareGameLink';
import { event } from 'nextjs-google-analytics';
import usePlaySimilar from '../hooks/usePlaySimilar';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const GameOver = ({ score, questionsAnswered, db, gameId, userId, longestStreak, incorrectAnswers, currentStreak, handleChatWithTutor, leaderboardName, learningLevel, resetGame }) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shareUrl, setShareUrl] = useState('');

  const functions = getFunctions();
  const handlePlaySimilar = usePlaySimilar();

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

  const getAndIncrementGameNumber = useCallback(async () => {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const gameNumber = (userData?.gameCount || 0) + 1;

    // Increment the game count in the user's document
    await updateDoc(userRef, {
      gameCount: gameNumber
    });

    return gameNumber;
  }, [db, userId]);

  const saveGameStatsToHistory = useCallback(async () => {
    if (currentStreak === undefined) {
      return;
    }

    const gameNumber = await getAndIncrementGameNumber();

    // Use the leaderboardName prop instead of fetching it again
    const leaderboardNameToUse = leaderboardName;

    // Check if the current streak is greater than the longest streak
    if (currentStreak > longestStreak) {
      setLongestStreak(currentStreak);
    }

    const gameStats = {
      gameId,
      leaderboardName: leaderboardNameToUse,
      score,
      questionsAnswered,
      longestStreak,
      sharedAt: new Date(),
      gameNumber,
      learningLevel,
    };

    const gameDocRef = doc(db, 'users', userId, 'games', gameId);
    await setDoc(gameDocRef, gameStats, { merge: true });

    // Call the Cloud Function
    const recalculateUserStats = httpsCallable(functions, 'recalculateUserStats');
    await recalculateUserStats({ userId });

    return gameStats;
  }, [currentStreak, gameId, score, questionsAnswered, longestStreak, db, userId, leaderboardName, learningLevel, functions, getAndIncrementGameNumber]); // Added 'functions' and 'getAndIncrementGameNumber'

  useEffect(() => {
    saveGameStatsToHistory();
  }, [saveGameStatsToHistory]);

  const createShareDocument = async () => {
    const shareId = `${leaderboardName}_${Date.now()}`;
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
    const shareLink = `${APP_URL}/results/${shareId}`;
    setShareUrl(shareLink);
  };

  const handleShareResults = async () => {
    setError('');
    setLoading(true);

    try {
      let finalLeaderboardName = leaderboardName;
      if (!finalLeaderboardName) {
        setLoading(false);
        return;
      }

      const { shareId, shareDocRef, batch } = await createShareDocument();
      await addHistoryToSharedDocument(shareDocRef, batch);
      await batch.commit();

      await generateShareLink(shareId);
    } catch (error) {
      console.error('Error in handleShareResults:', error);
      setError('Failed to share game history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Log the event when the GameOver component renders
    event('game_over', {
      category: 'Game',
      label: 'GameOver Render',
      value: score,
    });
  }, [score]);

  return (
    <div className="text-center w-[400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Round over!</h2>
        <FinalScore score={score} questionsAnswered={questionsAnswered} sharedAt={new Date()} />
        <PostGameMessage db={db} userId={userId} score={score} incorrectAnswers={incorrectAnswers} gameHistory={gameHistory} leaderboardName={leaderboardName} />
        <IncorrectReview incorrectAnswers={incorrectAnswers} onChatWithTutor={handleChatWithTutor} onPlaySimilar={handlePlaySimilar} resetGame={resetGame} />
        <GameHistory gameHistory={gameHistory} enableReview={true} onChatWithTutor={handleChatWithTutor} onPlaySimilar={handlePlaySimilar} resetGame={resetGame} />
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            onClick={resetGame}
            radius="full"
            className="bg-cyan-400 text-white"
          >
            Play Again
          </Button>
          <Button
            onClick={handleShareResults}
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            disabled={loading}
            auto
          >
            {loading ? (
              <>
                Sharing...
                <Spinner size="sm" color="white" />
              </>
            ) : (
              'Share Results'
            )}
          </Button>
        </div>
        {shareUrl && <ShareGameLink url={shareUrl} />}
        {error && <p className="text-red-500">{error}</p>}
      </motion.div>
    </div>
  );
};

export default GameOver;
