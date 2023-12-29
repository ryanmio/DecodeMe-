// pages/user/[userId].js
import { db } from '../../firebaseAdmin';
import Head from 'next/head';
import RootLayout from '../../components/layout';
import Image from 'next/image';
import { Button, Divider, Spacer } from '@nextui-org/react'; // Import NextUI components
import { useRouter } from 'next/router'; // Import useRouter for navigation

const UserStatsPage = ({ userData }) => {
  const router = useRouter(); // Initialize useRouter
  // Metadata for sharing
  const metadata = {
    title: `User Stats for ${userData?.leaderboardName}`,
    description: `Check out the user stats for ${userData?.leaderboardName} on DecodeMe!`,
    image: 'https://decodeme.app/images/shareimage.png',
    url: `https://decodeme.app/user/${userData?.id}`,
  };

  // Function to capitalize the first letter of the leaderboard name
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

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
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">{capitalize(userData?.leaderboardName)} Score</h1>
              <span className="text-lg font-semibold text-gray-700">{userData?.initials}</span>
            </div>
            <div className="flex items-center justify-center my-4">
              <span role="img" aria-label="trophy" style={{ fontSize: '2em', alignSelf: 'center' }}>🏆</span> 
              <span className="text-6xl font-bold text-gray-900 ml-4" style={{ alignSelf: 'center' }}>100</span>
            </div>
            <p className="text-center text-gray-700">This is your lifetime score</p>
            <div className="my-6">
              <h2 className="text-lg font-semibold text-gray-900">Lifetime Stats</h2>
              <p className="text-lg text-gray-700">High Score: {userData?.highScore}</p>
              <p className="text-lg text-gray-700">Daily Streak: {userData?.currentStreak}</p>
            </div>
            <div className="my-6">
              <h2 className="text-lg font-semibold text-gray-900">Accuracy</h2>
              <div className="space-y-1"> {/* Add space between bars */}
                <div className="relative bg-blue-500 h-5 rounded-full opacity-70 hover:opacity-100" style={{ width: '70%' }}>
                  <span className="absolute inset-y-0 left-0 flex items-center ml-2 text-xs font-thin text-white">Beginner</span>
                </div> {/* Beginner bar with label */}
                <div className="relative bg-blue-500 h-5 rounded-full opacity-70 hover:opacity-100" style={{ width: '50%' }}>
                  <span className="absolute inset-y-0 left-0 flex items-center ml-2 text-xs font-thin text-white">Standard</span>
                </div> {/* Standard bar with label */}
                <div className="relative bg-blue-500 h-5 rounded-full opacity-70 hover:opacity-100" style={{ width: '30%' }}>
                  <span className="absolute inset-y-0 left-0 flex items-center ml-2 text-xs font-thin text-white">Expert</span>
                </div> {/* Expert bar with label */}
              </div>
            </div>
            <Divider />
            <Spacer y={1} />
            <div className="flex justify-around mt-4 space-x-4">
              <Button color="primary" auto style={{ backgroundColor: '#007BFF', color: 'white' }} onClick={() => router.push('/history')}>
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
      notFound: true,
    };
  }
};

export default UserStatsPage;


