// pages/history/[userId].js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, collection, getDocs, orderBy, query, desc } from 'firebase/firestore';
import { getFirebaseFirestore } from '../../firebase';
import GameHistory from '../../components/GameHistory';
import RootLayout from '../../layout';
import NavigationButtons from '../../components/NavigationButtons';
import { format } from 'date-fns';
import { Pagination } from '@nextui-org/react';

const HistoryPage = ({ userData, userHistory }) => {
  console.log('HistoryPage userHistory:', userHistory);
  console.log('HistoryPage userData:', userData);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = userHistory.slice(indexOfFirstGame, indexOfLastGame);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const resetGame = () => {
    router.push('/'); // Navigate to home page
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
            <NavigationButtons resetGame={resetGame} question={{}} />
            <div className="results-header mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900">Game History</h1>
              <p className="text-lg text-center text-gray-700">Leaderboard Name: {userData?.leaderboardName}</p>
            </div>
            {currentGames.map((gameHistory) => (
              <div key={gameHistory.gameId} className="bg-white p-6 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Game {String(gameHistory.gameStats.gameNumber).padStart(3, '0')}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {format(new Date(gameHistory.timestamp.seconds * 1000), 'PPPp')}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-lg text-gray-700">
                      Score: {gameHistory.gameStats.score}
                    </div>
                    <div className="text-lg text-gray-700">
                      Longest Streak: {gameHistory.gameStats.longestStreak}
                    </div>
                  </div>
                </div>
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
  const collectionQuery = query(collectionRef, orderBy('timestamp', 'desc'));
  return await getDocs(collectionQuery);
}

export const getServerSideProps = async (context) => {
  try {
    const db = getFirebaseFirestore();
    const { query: contextQuery } = context;
    const { userId } = contextQuery;

    console.log('context.query:', contextQuery);

    let userData = null;
    let userHistory = [];

    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      console.log('User document exists:', userDocSnap.exists());

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
      } else {
        console.log(`No user data found for userId: ${userId}`);
      }
    } else {
      console.log('No userId provided in the query');
    }

    console.log('userData:', userData);
    console.log('userHistory:', userHistory);

    return {
      props: {
        userData: JSON.parse(JSON.stringify(userData)) ?? null,
        userHistory: JSON.parse(JSON.stringify(userHistory)) ?? [],
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        error: 'Failed to fetch user data',
        userHistory: [],
      },
    };
  }
};

export default HistoryPage;
