// pages/user/[userId].js
import { db } from '../../firebaseAdmin';
import Head from 'next/head';
import RootLayout from '../../components/layout'; // Import the RootLayout component

const UserStatsPage = ({ userData }) => {
  // Metadata for sharing
  const metadata = {
    title: `User Stats for ${userData?.leaderboardName}`,
    description: `Check out the user stats for ${userData?.leaderboardName} on DecodeMe!`,
    image: 'https://decodeme.app/images/shareimage.jpeg',
    url: `https://decodeme.app/user/${userData?.id}`,
  };

  return (
    <RootLayout metadata={metadata}> {/* Wrap content with RootLayout */}
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
            <h1 className="text-2xl font-bold text-center text-gray-900">User Stats</h1>
            <div className="text-lg text-center text-gray-700">
              <p>Leaderboard Name: {userData?.leaderboardName}</p>
              <p>High Score: {userData?.highScore}</p>
              <p>Current Streak: {userData?.currentStreak}</p>
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