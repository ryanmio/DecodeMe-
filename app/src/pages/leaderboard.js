// leaderboard.js
import { getFirebaseFirestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Pagination } from '@nextui-org/react';
import React, { useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";

export const getServerSideProps = async () => {
  const db = getFirebaseFirestore();
  const leaderboardCollectionRef = collection(db, 'leaderboard');
  const leaderboardSnapshot = await getDocs(leaderboardCollectionRef);
  let leaderboardData = leaderboardSnapshot.docs.map(docSnapshot => {
    let data = docSnapshot.data();
    if (data.date) {
      data.date = new Date(data.date.seconds * 1000); // Convert Firestore Timestamp to JavaScript Date
    }
    return {
      id: docSnapshot.id,
      ...data
    };
  });

  // Sort leaderboard data by score
  leaderboardData.sort((a, b) => b.score - a.score);

  return {
    props: {
      leaderboardData: JSON.parse(JSON.stringify(leaderboardData)),
    },
  };
};

const LeaderboardPage = ({ leaderboardData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaderboardData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8">
            <h1 className="text-2xl font-bold text-center text-gray-900">Leaderboard</h1>
            {currentItems.map((game) => (
              <div key={game.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {game.leaderboardName}: {game.score}
                  </h2>
                  <span className="text-sm text-gray-500">
                    Date: {game.date ? new Date(game.date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-lg text-gray-700">
                      Longest Streak: {game.longestStreak || 0}
                    </div>
                    <div className="text-lg text-gray-700">
                      Language: {game.language || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Pagination
              total={Math.ceil(leaderboardData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
};

export default LeaderboardPage;
