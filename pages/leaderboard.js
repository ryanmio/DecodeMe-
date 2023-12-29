// leaderboard.js
import { getFirebaseFirestore } from '../app/src/firebase';
import { collection, getDocs, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { Pagination } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { NextUIProvider, Tabs, Tab } from "@nextui-org/react";
import NavigationButtons from 'components/NavigationButtons';
import { useRouter } from 'next/router';
import Head from 'next/head';

const fetchLeaderboardData = async (filter) => {
  let startDate;
  switch(filter) {
    case 'weekly':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'monthly':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'lifetime':
    default:
      startDate = null;
  }

  const db = getFirebaseFirestore();
  const leaderboardCollectionRef = collection(db, 'leaderboard');
  let leaderboardQuery = leaderboardCollectionRef;
  if (startDate) {
    const firestoreStartDate = Timestamp.fromDate(startDate);
    leaderboardQuery = query(leaderboardCollectionRef, orderBy('date', 'desc'), where('date', '>=', firestoreStartDate));
  }

  try {
    const leaderboardSnapshot = await getDocs(leaderboardQuery);
    console.log(`Number of documents returned: ${leaderboardSnapshot.docs.length}`);

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

    return leaderboardData;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw error;  // re-throw the error to be caught in getServerSideProps
  }
};

export const getStaticProps = async () => {
  try {
    const leaderboardData = await fetchLeaderboardData('lifetime');
    const props = {
      leaderboardData: JSON.parse(JSON.stringify(leaderboardData)),
    };
    return { 
      props,
      revalidate: 300, // Regenerate the page every 5 minutes
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    const props = {
      leaderboardData: [],
      error: error.message,
    };
    return { 
      props,
      revalidate: 300, // Regenerate the page every 5 minutes
    };
  }
};

const LeaderboardPage = ({ leaderboardData, error }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('lifetime');
  const [data, setData] = useState(leaderboardData);
  const [newData, setNewData] = useState(null); // New state for new data

  const handleFilterChange = async (newFilter) => {
    setNewData(null);
    try {
      setFilter(newFilter);
      const newLeaderboardData = await fetchLeaderboardData(newFilter);
      setNewData(newLeaderboardData);
      setData(newLeaderboardData);
    } catch (error) {
      console.error("Error fetching new leaderboard data:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (newData || data).slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getOrdinalSuffix = (i) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = i % 100;
    return i + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  const resetGame = () => {
    router.push('/'); // Navigate to home page
  };

  return (
    <NextUIProvider>
      <Head>
        <title>Leaderboard - DecodeMe!</title>
        <meta name="description" content="Check out the leaderboard on DecodeMe!" />
        <meta key="og:title" property="og:title" content="Leaderboard - DecodeMe!" />
        <meta key="og:description" property="og:description" content="Check out the leaderboard on DecodeMe!" />
        <meta property="og:image" content="https://decodeme.app/images/shareimage.jpeg" />
        <meta property="og:url" content="https://decodeme.app/leaderboard" />
      </Head>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 fixed-width">
            <NavigationButtons resetGame={resetGame} question={{}} />
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Leaderboard</h1>
            <div className="flex justify-center mb-4">
              <Tabs 
                aria-label="Leaderboard Filter"         
                selectedKey={filter}
                onSelectionChange={handleFilterChange}
              >
                <Tab key="lifetime" title="Lifetime" />
                <Tab key="monthly" title="Monthly" />
                <Tab key="weekly" title="Weekly" />
              </Tabs>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4 text-center px-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">#</h2>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Player</h2>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Score</h2>
            </div>
            {currentItems.map((game, index) => (
                <div key={game.id} className="grid grid-cols-3 gap-4 mb-4 text-center px-4">
                  <span className="text-lg text-gray-700">{getOrdinalSuffix(indexOfFirstItem + index + 1)}</span>
                  <span className="text-lg text-gray-700">{game.leaderboardName || 'Unknown'}</span>
                  <span className="text-lg text-gray-700">{game.score}</span>
                </div>
              ))}
            <Pagination
              total={Math.ceil(data.length / itemsPerPage)}
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
