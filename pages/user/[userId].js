// pages/user/[userId].js
// aka scorecard page
import { db } from '../../firebaseAdmin';
import Head from 'next/head';
import RootLayout from '../../components/layout';
import { Button, Divider, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import NavigationButtons from '../../components/NavigationButtons';

const UserStatsPage = ({ userData }) => {
  const router = useRouter();

  const resetGame = () => {
    router.push('/');
  };

  const metadata = {
    title: `User Stats for ${userData?.leaderboardName}`,
    description: `Check out the user stats for ${userData?.leaderboardName} on DecodeMe!`,
    image: 'https://decodeme.app/images/shareimage.png',
    url: `https://decodeme.app/user/${userData?.id}`,
  };

  // Function to capitalize the first letter of the leaderboard name
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  // Extract the game counts for each learning level from userData
  const { beginner = 0, intermediate = 0, expert = 0 } = userData?.gameCountsByLevel || {};

  // Calculate the maximum game count. If all game counts are 0, set the maximum game count to 1.
  const maxGameCount = Math.max(beginner, intermediate, expert) || 1;

  // Calculate the width of each bar as a percentage of the maximum game count
  // If all counts are 0, we want to show full bars, so we set the width to 100%.
  const allCountsAreZero = beginner === 0 && intermediate === 0 && expert === 0;
  const beginnerWidth = allCountsAreZero ? 100 : (beginner / maxGameCount) * 100;
  const intermediateWidth = allCountsAreZero ? 100 : (intermediate / maxGameCount) * 100;
  const expertWidth = allCountsAreZero ? 100 : (expert / maxGameCount) * 100;

  return (
    <RootLayout metadata={metadata}>
      <Head>
        <title key="title">{metadata.title}</title>
        <meta key="description" name="description" content={metadata.description} />
        <meta key="og:title" property="og:title" content={metadata.title} />
        <meta key="og:description" property="og:description" content={metadata.description} />
        <meta key="og:image" property="og:image" content={metadata.image} />
        <meta key="og:url" property="og:url" content={metadata.url} />
      </Head>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <NavigationButtons resetGame={resetGame} question={{}} />
            <div className="flex justify-center items-center mt-4 sm:mt-0">
            <h1 className="text-2xl font-bold text-gray-900 text-center">{capitalize(userData?.leaderboardName)} Score</h1>
              <span className="text-lg font-semibold text-gray-700">{userData?.initials}</span>
            </div>
            <div className="flex items-center justify-center my-4">
              <span role="img" aria-label="trophy" style={{ fontSize: '2em', alignSelf: 'center' }}>🏆</span> 
              <span className="text-6xl font-bold text-gray-900 ml-4" style={{ alignSelf: 'center' }}>{userData?.lifetimeScore || 0}</span>
            </div>
            <p className="text-center text-gray-700">This is your lifetime score</p>
            <div className="my-6">
              <h2 className="text-lg font-semibold text-gray-900">Lifetime Stats</h2>
              <p className="text-lg text-gray-700">High Score: {userData?.highScore}</p>
              <p className="text-lg text-gray-700">Daily Streak: {userData?.currentStreak}</p>
            </div>
            <div className="my-6">
              <h2 className="text-lg font-semibold text-gray-900">Game Count</h2>
              <div className="space-y-2">
                <div className="relative bg-gray-200 h-5 rounded-full shadow-inner">
                  <div className="bg-blue-500 h-5 rounded-full" style={{ width: `${beginnerWidth}%` }}></div>
                  <span className="absolute inset-y-0 left-0 flex items-center ml-2 text-xs font-medium text-gray-900">Beginner: {beginner}</span>
                </div>
                <div className="relative bg-gray-200 h-5 rounded-full shadow-inner">
                  <div className="bg-blue-500 h-5 rounded-full" style={{ width: `${intermediateWidth}%` }}></div>
                  <span className="absolute inset-y-0 left-0 flex items-center ml-2 text-xs font-medium text-gray-900">Intermediate: {intermediate}</span>
                </div>
                <div className="relative bg-gray-200 h-5 rounded-full shadow-inner">
                  <div className="bg-blue-500 h-5 rounded-full" style={{ width: `${expertWidth}%` }}></div>
                  <span className="absolute inset-y-0 left-0 flex items-center ml-2 text-xs font-medium text-gray-900">Expert: {expert}</span>
                </div>
              </div>
            </div>
            <Divider />
            <Spacer y={1} />
            <div className="flex justify-around mt-4 space-x-4">
              <Button color="primary" auto style={{ backgroundColor: '#007BFF', color: 'white' }} onClick={() => router.push(`/history/${userData?.id}`)}>
                Game History
              </Button>
              <Button color="secondary" auto style={{ backgroundColor: '#007BFF', color: 'white' }} onClick={() => router.push('/leaderboard')}>
                Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const { userId } = params;

    let userData = null;

    if (userId) {
      const userDocRef = db.collection('users').doc(userId);
      const userDocSnap = await userDocRef.get();

      if (userDocSnap.exists) {
        userData = {
          id: userDocSnap.id,
          ...userDocSnap.data(),
        };
      }
    }

    return {
      props: {
        userData: userData ? JSON.parse(JSON.stringify(userData)) : null,
      },
    };
  } catch (error) {
    console.error('Error fetching data in getServerSideProps:', error);
    return {
      props: {
        error: error.message,
      },
    };
  }
};

export default UserStatsPage;
