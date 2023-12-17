// pages/history/[userId].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { getFirebaseFirestore } from '../../app/src/firebase';
import GameHistory from '../../components/GameHistory';
import RootLayout from '../../components/layout';
import NavigationButtons from '../../components/NavigationButtons';
import { format } from 'date-fns';
import { Pagination } from '@nextui-org/react';

const HistoryPage = () => {
  const [userData, setUserData] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;
  const router = useRouter();
  const { userId } = router.query; // Get the user ID from the URL

  useEffect(() => {
    // Only fetch data if the userId is available
    if (userId) {
      const fetchUserDataAndHistory = async () => {
        const db = getFirebaseFirestore();
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());

          // Fetch game history
          const gamesSnapshot = await fetchCollection(userRef, 'games');
          const historyData = await Promise.all(gamesSnapshot.docs.map(async (gameDocSnapshot) => {
            const gameId = gameDocSnapshot.id;
            const gameData = gameDocSnapshot.data();

            // Fetch game history for each game
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

          setUserHistory(historyData);
        }

        setLoading(false); // Set loading to false after data has been fetched
      };

      fetchUserDataAndHistory();
    }
  }, [userId]);

  // Calculate the games to display based on pagination
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
      {loading ? (
        <div>Loading...</div> // Display a loading message or spinner
      ) : (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
              <NavigationButtons resetGame={resetGame} question={{}} />
              <div className="results-header mb-4">
                <h1 className="text-2xl font-bold text-center text-gray-900">Game History</h1>
                <p className="text-lg text-center text-gray-700">Leaderboard Name: {userData?.leaderboardName}</p>
              </div>
              {currentGames.map((gameHistory) => {
                console.log('gameHistory:', gameHistory);
                return gameHistory && gameHistory.gameStats && (
                  <div key={gameHistory.gameId} className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Game {String(gameHistory.gameStats.gameNumber || '').padStart(3, '0')}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {gameHistory.timestamp && format(new Date(gameHistory.timestamp.seconds * 1000), 'PPPp')}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <div className="text-lg text-gray-700">
                          Score: {gameHistory.gameStats.score || 'N/A'}
                        </div>
                        <div className="text-lg text-gray-700">
                          Longest Streak: {gameHistory.gameStats.longestStreak || 'N/A'}
                        </div>
                      </div>
                    </div>
                    {gameHistory.history && <GameHistory gameHistory={gameHistory.history} />}
                  </div>
                )
              })}

              <Pagination
                total={Math.ceil(userHistory.length / gamesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
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
    // No data fetching here, return empty props
    return {
      props: {},
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        error: 'Failed to fetch user data',
      },
    };
  }
};

export default HistoryPage;

