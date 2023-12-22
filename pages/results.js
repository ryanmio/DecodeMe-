// pages/results.js
import React from 'react';
import { db } from '../firebaseAdmin';
import ChallengeSection from '../components/ChallengeSection';
import GameHistory from '../components/GameHistory';
import FinalScore from '../components/FinalScore';
import RootLayout from '../components/layout';

const ResultsPage = ({ gameData, gameHistory }) => {
  console.log('Rendering ResultsPage with gameData:', gameData);
  console.log('Rendering ResultsPage with gameHistory:', gameHistory);

  const metadata = {
    title: `Game Results for ${gameData?.leaderboardName}`,
    description: `Check out the game results for ${gameData?.leaderboardName} on DecodeMe!`,
    image: '/images/shareimage.jpeg',
    url: `https://deocdeme.app/results/${gameData?.id}`,
  };

  return (
    <RootLayout metadata={metadata}>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <div className="results-header mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900">Game Results</h1>
              <p className="text-lg text-center text-gray-700">Leaderboard Name: {gameData?.leaderboardName}</p>
            </div>
            <FinalScore score={gameData?.score} questionsAnswered={gameData?.questionsAnswered} sharedAt={gameData?.sharedAt} longestStreak={gameData?.longestStreak} />
            <GameHistory gameHistory={gameHistory} />
          </div>
        </div>
        <div className="pt-5">
          <ChallengeSection />
        </div>
      </div>
    </RootLayout>
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
