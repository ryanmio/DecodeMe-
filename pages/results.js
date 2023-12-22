// pages/results.js
import React from 'react';
import { db } from '../firebaseAdmin';
import RootLayout from '../components/layout';

const ResultsPage = ({ gameData, gameHistory }) => {
  const metadata = {
    title: `Game Results${gameData ? ` for ${gameData.leaderboardName}` : ''}`,
    description: `Check out the game results${gameData ? ` for ${gameData.leaderboardName}` : ''} on DecodeMe!`,
    image: '/images/shareimage.jpeg',
    url: gameData ? `https://deocdeme.app/results/${gameData.id}` : 'https://deocdeme.app/results',
  };

  return (
    <RootLayout metadata={metadata}>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <h1 className="text-2xl font-bold text-center text-gray-900">Game Results</h1>
                       <p className="text-lg text-center text-gray-700">Leaderboard Name: {gameData?.leaderboardName}</p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { shareId } = context.query;
    let gameData = null;

    if (shareId) {
      const shareDocRef = db.collection('sharedResults').doc(shareId);
      const shareDocSnap = await shareDocRef.get();

      if (shareDocSnap.exists) {
        gameData = { id: shareDocSnap.id, ...shareDocSnap.data() };
      }
    }

    return {
      props: {
        gameData: gameData ? JSON.parse(JSON.stringify(gameData)) : null,
        gameHistory: [],
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: { gameData: null, gameHistory: [] } };
  }
};

export default ResultsPage;
