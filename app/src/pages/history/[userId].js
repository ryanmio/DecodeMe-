// pages/history/[userId].js
import React from 'react';
import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getFirebaseFirestore } from '../../firebase';
import GameHistory from '../../components/GameHistory';
import RootLayout from '../../layout';

const HistoryPage = ({ userData, userHistory }) => {
  const metadata = {
    title: `Game History for ${userData?.leaderboardName}`,
    description: `Check out the game history for ${userData?.leaderboardName} on DecodeMe!`,
    image: '/images/shareimage.jpeg',
    url: `https://deocdeme.app/history/${userData?.id}`,
  };

  return (
    <RootLayout metadata={metadata}>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <div className="results-header mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900">Game History</h1>
              <p className="text-lg text-center text-gray-700">Leaderboard Name: {userData?.leaderboardName}</p>
            </div>
            {userHistory.map((gameHistory, index) => (
              <div key={index}>
                <h2>Game ID: {gameHistory.gameId}</h2>
                <GameHistory gameHistory={gameHistory.history} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: "20px" }}>
          {/* Add any additional sections here */}
        </div>
      </div>
    </RootLayout>
  );
};

export const getServerSideProps = async (context) => {

  const db = getFirebaseFirestore();
  const { query: contextQuery } = context;
  const { userId } = contextQuery;

  let userData = null;
  let userHistory = [];

  if (userId) {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      userData = {
        id: userDocSnap.id,
        ...userDocSnap.data(),
      };

      // Retrieve the games collection
      const gamesCollectionRef = collection(userDocRef, 'games');
      const gamesQuery = query(gamesCollectionRef, orderBy('timestamp'));
      const gamesSnapshot = await getDocs(gamesQuery);

      userHistory = await Promise.all(gamesSnapshot.docs.map(async (gameDocSnapshot) => {
        const gameId = gameDocSnapshot.id;

        // Retrieve the history subcollection for each game
        const historyCollectionRef = collection(gameDocSnapshot.ref, 'history');
        const historyQuery = query(historyCollectionRef, orderBy('timestamp'));
        const historySnapshot = await getDocs(historyQuery);
        const gameHistory = historySnapshot.docs.map(docSnapshot => ({
          id: docSnapshot.id,
          ...docSnapshot.data()
        }));

        return {
          gameId,
          history: gameHistory,
        };
      }));

    }
  }

  return {
    props: {
      userData: userData ? {
        ...JSON.parse(JSON.stringify(userData)),
      } : null,
      userHistory: JSON.parse(JSON.stringify(userHistory)),
    },
  };
};

export default HistoryPage;
