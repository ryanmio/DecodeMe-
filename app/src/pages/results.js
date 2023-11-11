// pages/results.js
import React from 'react';
import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getFirebaseFirestore } from '../firebase';
import ChallengeSection from '../components/ChallengeSection';
import {CircularProgress} from "@nextui-org/react";
import GameHistory from '../components/GameHistory';

const ResultsPage = ({ gameData, gameHistory }) => {
  console.log("Rendering ResultsPage with gameData:", gameData, "and gameHistory:", gameHistory); // Added console log
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
          <div className="results-header mb-4">
            <h1 className="text-2xl font-bold text-center text-gray-900">Game Results</h1>
            <p className="text-lg text-center text-gray-700">Leaderboard Name: {gameData?.leaderboardName}</p>
          </div>
          <div className="flex justify-center items-center mb-6">
            <CircularProgress
              label="Accuracy"
              size="lg"
              value={gameData ? (gameData.score / gameData.questionLimit) * 100 : 0}
              color="success"
              formatOptions={{ style: "percent" }}
              showValueLabel={true}
            />
            <div className="ml-6">
              <p className="text-lg font-semibold text-gray-700">Questions Correct: {gameData?.score} / {gameData?.questionLimit}</p>
              <p className="results-shared-at text-sm text-gray-500">Shared: {gameData ? new Date(gameData.sharedAt).toLocaleString() : 'Loading...'}</p>
            </div>
          </div>
          <GameHistory gameHistory={gameHistory} />
        </div>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <ChallengeSection />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const db = getFirebaseFirestore();

  const { query: contextQuery } = context;
  const { shareId } = contextQuery;

  console.log('Share ID:', shareId); // Added console log

  let gameData = null;
  let gameHistory = [];

  if (shareId) {
    const shareDocRef = doc(db, 'sharedResults', shareId);
    const shareDocSnap = await getDoc(shareDocRef);

    console.log('Share document snapshot:', shareDocSnap); // Added console log

    if (shareDocSnap.exists()) {
      gameData = {
        id: shareDocSnap.id,
        ...shareDocSnap.data(),
        sharedAt: shareDocSnap.data().sharedAt.toDate().toISOString()
      };

      console.log('Fetched game data:', gameData); // Added console log

      // Retrieve the history subcollection
      const historyCollectionRef = collection(shareDocRef, 'history');
      const historyQuery = query(historyCollectionRef, orderBy('timestamp')); // replace 'createdAt' with 'timestamp'
      const historySnapshot = await getDocs(historyQuery);

      console.log('History snapshot:', historySnapshot); // Added console log

      gameHistory = historySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));

      console.log('Fetched game history:', gameHistory); // Added console log
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
