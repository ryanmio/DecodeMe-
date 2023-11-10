// pages/results.js
import React from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getFirebaseFirestore } from '../firebase';
import { CodeBlock, dracula } from 'react-code-blocks';

const ResultsPage = ({ gameData, gameHistory }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="results-header mb-4">
            <h1 className="text-2xl font-bold text-center text-gray-900">Game Results</h1>
          </div>
          <p className="results-score text-lg font-semibold text-gray-700 mb-2">Score: {gameData?.score} / {gameData?.questionLimit}</p>
          <p className="results-shared-at text-sm text-gray-500 mb-6">Shared: {gameData ? new Date(gameData.sharedAt).toLocaleString() : 'Loading...'}</p>
          <div className="game-history">
      {gameHistory.map((entry, index) => {
        const formattedQuestion = entry.question.replace(/```python\n|```python|```/g, '').trim();
        return (
          <div key={entry.id} className="game-history-entry bg-gray-50 p-4 rounded-lg shadow mb-4">
            <div className="game-question text-gray-800">
              <h3>Code Snippet {index + 1}</h3>
              <CodeBlock 
                text={formattedQuestion} 
                language={"python"} 
                showLineNumbers={true} 
                theme={dracula} 
                wrapLines 
              />
            </div>
            <p className="game-answer text-gray-800">My Answer: {entry.answer}</p>
            <p className={`game-correct font-semibold ${entry.isCorrect ? 'text-green-500' : 'text-red-500'}`}>Correct: {entry.isCorrect ? 'Yes' : 'No'}</p>
          </div>
        );
      })}
    </div>
        </div>
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
