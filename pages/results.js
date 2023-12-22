// pages/results.js
import React from 'react';
import { db } from '../firebaseAdmin';
import ChallengeSection from '../components/ChallengeSection';
import GameHistory from '../components/GameHistory';
import FinalScore from '../components/FinalScore';
import RootLayout from '../components/layout';

const ResultsPage = ({ gameData, gameHistory }) => {
  return (
    <div>
      <h1>{gameData?.leaderboardName}</h1>
      <p>{gameData?.score}</p>
      <FinalScore 
        score={gameData?.score} 
        questionsAnswered={gameData?.questionsAnswered} 
        sharedAt={gameData?.sharedAt} 
        longestStreak={gameData?.longestStreak} 
      />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { query: contextQuery } = context;
    const { shareId } = contextQuery;

    console.log('shareId:', shareId);

    let gameData = null;
    let gameHistory = [];

    if (shareId) {
      const shareDocRef = db.collection('sharedResults').doc(shareId);
      console.log('shareDocRef:', shareDocRef);
      const shareDocSnap = await shareDocRef.get();

      if (shareDocSnap.exists) {
        const shareData = shareDocSnap.data();
        gameData = {
          id: shareDocSnap.id,
          ...shareData,
          sharedAt: shareData?.sharedAt?.toDate()?.toISOString() ?? null,
          gameId: shareData?.gameId ?? '',
          gameNumber: shareData?.gameNumber ?? 0,
          leaderboardName: shareData?.leaderboardName ?? '',
          longestStreak: shareData?.longestStreak ?? 0,
          questionsAnswered: shareData?.questionsAnswered ?? 0,
          score: shareData?.score ?? 0,
        };

        console.log('gameData:', gameData); // New console log

        // Retrieve the history subcollection
        const historyCollectionRef = shareDocRef.collection('history');
        const historySnapshot = await historyCollectionRef.get();

        gameHistory = historySnapshot.docs.map(docSnapshot => ({
          id: docSnapshot.id,
          ...docSnapshot.data()
        }));

        console.log('gameHistory:', gameHistory); // New console log
      }
    }

    return {
      props: {
        gameData: gameData ? {
          ...JSON.parse(JSON.stringify(gameData)),
          sharedAt: gameData.sharedAt,
        } : null,
        gameHistory: JSON.parse(JSON.stringify(gameHistory)),
      },
    };
  } catch (error) {
    console.error('Error fetching data in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
};

export default ResultsPage;
