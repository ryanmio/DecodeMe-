// pages/results.js
import React from 'react';
import { db } from '../firebaseAdmin';
import ChallengeSection from '../components/ChallengeSection';
import GameHistory from '../components/GameHistory';
import FinalScore from '../components/FinalScore';
import RootLayout from '../components/layout';
import Head from 'next/head';

const ResultsPage = ({ gameData, gameHistory }) => {
  return (
    <RootLayout>
      <Head>
        <title>Game Results for {gameData?.leaderboardName}</title>
        <meta name="description" content={`Check out the game results for ${gameData?.leaderboardName} on DecodeMe!`} />
        <meta property="og:title" content={`Game Results for ${gameData?.leaderboardName}`} key="og:title" />
        <meta property="og:description" content={`Check out the game results for ${gameData?.leaderboardName} on DecodeMe!`} key="og:description" />
        <meta property="og:image" content="/images/shareimage.jpeg" key="og:image" />
        <meta property="og:url" content={`https://deocdeme.app/results/${gameData?.id}`} key="og:url" />
      </Head>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <div className="results-header mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900">Game Results</h1>
              <p className="text-lg text-center text-gray-700">Leaderboard Name: {gameData?.leaderboardName}</p>
            </div>
            <FinalScore score={gameData?.score} questionsAnswered={gameData?.questionsAnswered} sharedAt={gameData?.sharedAt} strikes={gameData?.strikes} strikeLimit={gameData?.strikeLimit} />
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

    let gameData = null;
    let gameHistory = [];

    if (shareId) {
      const shareDocRef = db.collection('sharedResults').doc(shareId);
      const shareDocSnap = await shareDocRef.get();

      if (shareDocSnap.exists) {
        gameData = {
          id: shareDocSnap.id,
          ...shareDocSnap.data(),
          sharedAt: shareDocSnap.data().sharedAt.toDate().toISOString(),
          strikes: shareDocSnap.data().strikes,
          strikeLimit: shareDocSnap.data().strikeLimit,
        };

        // Retrieve the history subcollection
        const historyCollectionRef = shareDocRef.collection('history');
        const historySnapshot = await historyCollectionRef.get();

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
  } catch (error) {
    console.error('Error fetching data in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
};

export default ResultsPage;
