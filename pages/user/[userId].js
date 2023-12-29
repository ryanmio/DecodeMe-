// pages/user/[userId].js
import { db } from '../../firebaseAdmin';
import Head from 'next/head';

const UserStatsPage = ({ userData }) => {
  // Metadata for sharing
  const metadata = {
    title: `User Stats for ${userData?.leaderboardName}`,
    description: `Check out the user stats for ${userData?.leaderboardName} on DecodeMe!`,
    image: 'https://decodeme.app/images/shareimage.jpeg',
    url: `https://decodeme.app/user/${userData?.id}`,
  };

  return (
    <>
      <Head>
        <title key="title">{metadata.title}</title>
        <meta key="description" name="description" content={metadata.description} />
        <meta key="og:title" property="og:title" content={metadata.title} />
        <meta key="og:description" property="og:description" content={metadata.description} />
        <meta key="og:image" property="og:image" content={metadata.image} />
        <meta key="og:url" property="og:url" content={metadata.url} />
      </Head>
      <div>
        <h1>User Stats</h1>
        <p>Leaderboard Name: {userData?.leaderboardName}</p>
        <p>High Score: {userData?.highScore}</p>
        <p>Current Streak: {userData?.currentStreak}</p>
      </div>
    </>
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