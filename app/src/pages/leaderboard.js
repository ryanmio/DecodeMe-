// leaderboard.js
import { getFirebaseFirestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export const getServerSideProps = async () => {
  const db = getFirebaseFirestore();
  const gamesCollectionRef = collection(db, 'games');
  const gamesSnapshot = await getDocs(gamesCollectionRef);
  let leaderboardData = gamesSnapshot.docs.map(docSnapshot => ({
    id: docSnapshot.id,
    ...docSnapshot.data()
  }));

  // Sort leaderboard data by score
  leaderboardData.sort((a, b) => b.score - a.score);

  return {
    props: {
      leaderboardData: JSON.parse(JSON.stringify(leaderboardData)),
    },
  };
};

const LeaderboardPage = ({ leaderboardData }) => {
  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboardData.map((game) => (
          <li key={game.id}>
            {game.leaderboardName}: {game.score}
          </li>
        ))}
      </ul>
      <Link href="/leaderboard">Leaderboard</Link>
    </div>
  );
};

export default LeaderboardPage;
