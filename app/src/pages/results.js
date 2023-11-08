// pages/results.js
import React from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getFirebaseFirestore } from '../firebase';

const ResultsPage = ({ gameData, gameHistory }) => {
  // Make sure gameData is not null
  return (
    <div>
      <h1>Game Results</h1>
      <p>Score: {gameData?.score} / {gameData?.questionLimit}</p>
      {/* Convert the ISO string back to a readable date */}
      <p>Shared At: {gameData ? new Date(gameData.sharedAt).toString() : 'Loading...'}</p>
      <div>
        <h2>Game History</h2>
        {gameHistory.map((entry) => (
          <div key={entry.id}>
            <p>Question: {entry.question}</p>
            <p>Your Answer: {entry.answer}</p>
            <p>Correct: {entry.isCorrect ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const db = getFirebaseFirestore(); // Obtain Firestore instance using helper function

  const { query } = context;
  const { shareId } = query;

  let gameData = null;
  let gameHistory = [];

  if (shareId) {
    const shareDocRef = doc(db, 'sharedResults', shareId);
    const shareDocSnap = await getDoc(shareDocRef);

    if (shareDocSnap.exists()) {
      gameData = { 
        id: shareDocSnap.id, 
        ...shareDocSnap.data(), 
        // Convert Firestore Timestamp to ISO string
        sharedAt: shareDocSnap.data().sharedAt.toDate().toISOString()
      };

      // Retrieve the history subcollection
      const historyCollectionRef = collection(shareDocRef, 'history');
      const historySnapshot = await getDocs(historyCollectionRef);

      gameHistory = historySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));
    }
  }

  return {
    props: {
      gameData: gameData ? {
        ...JSON.parse(JSON.stringify(gameData)),
        // Pass the sharedAt as an ISO string
        sharedAt: gameData.sharedAt,
      } : null,
      gameHistory: JSON.parse(JSON.stringify(gameHistory)),
    },
  };
};

export default ResultsPage;
