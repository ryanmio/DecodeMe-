// pages/results.js
import React from 'react';
import { db } from '../firebaseAdmin';
import RootLayout from '../components/layout';

const ResultsPage = ({ gameData }) => {
  // Simplified rendering, focusing only on gameData
  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <h1 className="text-2xl font-bold text-center text-gray-900">Game Results</h1>
            {gameData ? (
              <p className="text-lg text-center text-gray-700">Leaderboard Name: {gameData.leaderboardName}</p>
            ) : (
              <p className="text-lg text-center text-gray-700">No Game Data Available</p>
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { shareId } = context.query;
    console.log('shareId received:', shareId); // Log for debugging
    let gameData = null;

    if (shareId) {
      console.log('Fetching Firestore document for shareId:', shareId);
      const shareDocRef = db.collection('sharedResults').doc(shareId);
      const shareDocSnap = await shareDocRef.get();

      if (shareDocSnap.exists) {
        console.log('Document found, processing data...');
        gameData = { id: shareDocSnap.id, ...shareDocSnap.data() };
        console.log('Processed gameData:', gameData);
      } else {
        console.log('No document found for shareId:', shareId);
      }
    } else {
      console.log('No shareId provided in query');
    }

    return {
      props: {
        gameData: gameData ? JSON.parse(JSON.stringify(gameData)) : null,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: { gameData: null } };
  }
};

export default ResultsPage;
