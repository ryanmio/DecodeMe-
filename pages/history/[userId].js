// pages/history/[userId].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getFirebaseFirestore } from '../../app/src/firebase';
import GameHistory from '../../components/GameHistory';
import RootLayout from '../../components/layout';
import NavigationButtons from '../../components/NavigationButtons';
import { format } from 'date-fns';
import { Pagination, Spinner, Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { useAuth } from '../../contexts/AuthContext';

const HistoryPage = () => {
  const [userData, setUserData] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 3;
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('date');

  const handleSortOptionChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  useEffect(() => {
    if (user) {
      const fetchUserDataAndHistory = async () => {
        try {
          const db = getFirebaseFirestore();
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());

            const gamesSnapshot = await fetchCollection(userRef, 'games');
            let historyData = await Promise.all(gamesSnapshot.docs.map(async (gameDocSnapshot) => {
              const { id: gameId, ...gameData } = gameDocSnapshot.data();

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

            historyData = historyData.filter(game => {
              const score = game.gameStats.score !== null ? game.gameStats.score : 0;
              const longestStreak = game.gameStats.longestStreak !== null ? game.gameStats.longestStreak : 0;
              const gameNumber = game.gameStats.gameNumber;
              const scoreIsValid = score !== 'N/A';
              const longestStreakIsValid = longestStreak !== 'N/A';
              const gameNumberIsValid = gameNumber !== '000' && gameNumber != null;
              return scoreIsValid && longestStreakIsValid && gameNumberIsValid;
            });

            if (sortOption === 'score') {
              historyData.sort((a, b) => b.gameStats.score - a.gameStats.score);
            } else if (sortOption === 'date') {
              historyData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
            }

            setUserHistory(historyData);
          }
        } catch (error) {
          console.error('Error fetching user data and history:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserDataAndHistory();
    }
  }, [user, sortOption]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = userHistory.slice(indexOfFirstGame, indexOfLastGame);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const resetGame = () => {
    router.push('/');
  };

  const metadata = {
    title: `History for ${userData?.leaderboardName}`,
    description: `Explore detailed game history for ${userData?.leaderboardName} on DecodeMe, the leading online gaming platform.`,
    image: '/images/shareimage.png',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/history/${userData?.id}`,
  };

  return (
    <RootLayout metadata={metadata}>
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 bg-custom-gradient">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <NavigationButtons resetGame={resetGame} question={{}} />
            <div className="results-header mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900">Game History</h1>
              <p className="text-lg text-center text-gray-700">Leaderboard Name: {userData?.leaderboardName}</p>
              <div className="flex justify-end items-center">
                <Breadcrumbs
                  size="sm"
                  onAction={(key) => setSortOption(key)}
                  classNames={{
                    list: "gap-2",
                  }}
                  itemClasses={{
                    item: [
                      "px-2 py-0.5 border-small border-default-400 rounded-small",
                      "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
                      "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
                    ],
                    separator: "hidden",
                  }}
                >
                  <BreadcrumbItem key="score" isCurrent={sortOption === "score"}>
                    Score ▾
                  </BreadcrumbItem>
                  <BreadcrumbItem key="date" isCurrent={sortOption === "date"}>
                    Date ▾
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>
            </div>
            {isLoading ? (
              <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '680px' }}>
                <Spinner label="Loading history..." color="primary" />
              </div>
            ) : userHistory.length === 0 ? (
              <div className="auth-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '680px' }}>
                <span className="icon-placeholder" style={{ fontSize: '3em' }}>🎮</span>
                <p style={{ color: 'darkgray' }}>You haven&apos;t played any games yet.</p>
              </div>
            ) : (
              <div style={{ minHeight: '680px' }}>
                {currentGames.map((gameHistory, index) => {
                  return gameHistory?.gameStats && (
                    <div key={gameHistory.gameId || index} className="bg-white p-6 rounded-lg shadow-md mb-4">
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
                            Score: {gameHistory.gameStats.score !== null && gameHistory.gameStats.score !== undefined ? gameHistory.gameStats.score : 'N/A'}
                          </div>
                          <div className="text-lg text-gray-700">
                            Longest Streak: {gameHistory.gameStats.longestStreak !== null && gameHistory.gameStats.longestStreak !== undefined ? gameHistory.gameStats.longestStreak : 'N/A'}
                          </div>
                        </div>
                      </div>
                      {gameHistory.history && <GameHistory gameHistory={gameHistory.history} />}
                    </div>
                  )
                })}
              </div>
            )}
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

export default HistoryPage;
