// pages/results.js
import React from 'react';
import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getFirebaseFirestore } from '../firebase';
import ChallengeSection from '../components/ChallengeSection';
import GameHistory from '../components/GameHistory';
import FinalScore from '../components/FinalScore';
import RootLayout from '../layout';

const ResultsPage = ({ gameData, gameHistory }) => {
  const metadata = {
    title: `Game Results for ${gameData?.leaderboardName}`,
    description: `Check out the game results for ${gameData?.leaderboardName} on DecodeMe!`,
    image: gameData?.image, // Replace with the URL of the image you want to display
    url: `https://yourwebsite.com/results/${gameData?.id}`, // Replace with the URL of the page
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
            <FinalScore score={gameData?.score} questionLimit={gameData?.questionLimit} sharedAt={gameData?.sharedAt} />
            <GameHistory gameHistory={gameHistory} />
          </div>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <ChallengeSection />
        </div>
      </div>
    </RootLayout>
  );
};

export const getServerSideProps = async (context) => {
  const db = getFirebaseFirestore();

  const { query: contextQuery } = context;
  const { shareId } = contextQuery;

  let gameData = null;
  let gameHistory = [];

  if (shareId) {
    const shareDocRef = doc(db, 'sharedResults', shareId);
    const shareDocSnap = await getDoc(shareDocRef);

    if (shareDocSnap.exists()) {
      gameData = {
        id: shareDocSnap.id,
        ...shareDocSnap.data(),
        sharedAt: shareDocSnap.data().sharedAt.toDate().toISOString()
      };

      // Retrieve the history subcollection
      const historyCollectionRef = collection(shareDocRef, 'history');
      const historyQuery = query(historyCollectionRef, orderBy('timestamp')); // replace 'createdAt' with 'timestamp'
      const historySnapshot = await getDocs(historyQuery);

      gameHistory = historySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));
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
};

export default ResultsPage;
