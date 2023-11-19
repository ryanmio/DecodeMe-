// leaderboard.js
import { getFirebaseFirestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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

  console.log(leaderboardData); // Debug log

  return {
    props: {
      leaderboardData: JSON.parse(JSON.stringify(leaderboardData)),
    },
  };
};

const LeaderboardPage = ({ leaderboardData }) => {
  console.log(leaderboardData); // Debug log

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboardData.map((game) => (
          <li key={game.id}>
            {game.leaderboardName}: {game.score}
            <br />
            Longest Streak: {game.longestStreak || 0}
            <br />
            Date: {game.date ? new Date(game.date).toLocaleString() : 'N/A'}
            <br />
            Language: {game.language || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardPage;