// pages/history/[userId].js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, collection, getDocs, orderBy, query, desc } from 'firebase/firestore'; // Added desc import
import { getFirebaseFirestore } from '../../firebase';
import GameHistory from '../../components/GameHistory';
import RootLayout from '../../layout';
import NavigationButtons from '../../components/NavigationButtons';
import { format } from 'date-fns';
import { Pagination } from '@nextui-org/react';

const HistoryPage = ({ userData, userHistory }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3; // Change this to your desired games per page

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = userHistory.slice(indexOfFirstGame, indexOfLastGame);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const metadata = {
    title: `DecodeMe Game History for ${userData?.leaderboardName}`,
    description: `Explore detailed game history for ${userData?.leaderboardName} on DecodeMe, the leading online gaming platform.`,
    image: '/images/shareimage.jpeg',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/history/${userData?.id}`,
  };

  return (
    <RootLayout metadata={metadata}>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <NavigationButtons />
            <div className="results-header mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900">Game History</h1>
              <p className="text-lg text-center text-gray-700">Leaderboard Name: {userData?.leaderboardName}</p>
            </div>
            {currentGames.map((gameHistory) => (
              <div key={gameHistory.gameId}>
                <h2>Played on: {format(new Date(gameHistory.timestamp.seconds * 1000), 'PPPp')}</h2>
                {gameHistory.gameStats && (
                  <>
                    <h3>Score: {gameHistory.gameStats.score}</h3>
                    <h3>Question Limit: {gameHistory.gameStats.questionLimit}</h3>
                    <h3>Longest Streak: {gameHistory.gameStats.longestStreak}</h3>
                  </>
                )}
                <GameHistory gameHistory={gameHistory.history} />
              </div>
            ))}
            <Pagination
              total={Math.ceil(userHistory.length / gamesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

async function fetchCollection(ref, collectionName) {
  const collectionRef = collection(ref, collectionName);
  const collectionQuery = query(collectionRef, orderBy('timestamp', 'desc')); // Order by timestamp in descending order
  return await getDocs(collectionQuery);
}

export const getServerSideProps = async (context) => {
  try {
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
        const gamesSnapshot = await fetchCollection(userDocRef, 'games');

        userHistory = await Promise.all(gamesSnapshot.docs.map(async (gameDocSnapshot) => {
          const gameId = gameDocSnapshot.id;
          const gameData = gameDocSnapshot.data();

          // Retrieve the history subcollection for each game
          const historySnapshot = await fetchCollection(gameDocSnapshot.ref, 'history');
          const gameHistory = historySnapshot.docs.map(docSnapshot => ({
            id: docSnapshot.id,
            ...docSnapshot.data()
          }));

          return {
            gameId,
            timestamp: gameData.timestamp,
            history: gameHistory,
            gameStats: {
              leaderboardName: gameData.leaderboardName,
              score: gameData.score,
              questionLimit: gameData.questionLimit,
              longestStreak: gameData.longestStreak,
              sharedAt: gameData.sharedAt,
              gameNumber: gameData.gameNumber,
            },
          };
        }));

      }
    }

    return {
      props: {
        userData: JSON.parse(JSON.stringify(userData)) ?? null,
        userHistory: JSON.parse(JSON.stringify(userHistory)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 'Failed to fetch user data',
      },
    };
  }
};

export default HistoryPage;
