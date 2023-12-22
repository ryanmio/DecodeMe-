// app/src/components/PostGameMessage.js
import React, { useEffect, useState, useCallback } from 'react';
import { getDoc, doc } from 'firebase/firestore';

const PostGameMessage = ({ db, userId, score, incorrectAnswers, gameHistory }) => {
  const [postGameMessage, setPostGameMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false); // Initially set to false

  const getUserStatsFromFirebase = useCallback(async () => {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error('No such user document!');
      return null;
    }
  }, [db, userId]);

  const formatIncorrectAnswers = (incorrectAnswers) => {
    return incorrectAnswers.join(', ');
  };

  const prepareDataForOpenAI = useCallback(async () => {
    const userStats = await getUserStatsFromFirebase();
    const formattedIncorrectAnswers = formatIncorrectAnswers(incorrectAnswers);
    const data = {
      score,
      incorrectAnswers: formattedIncorrectAnswers,
      gameHistory,
      userStats
    };
    return data;
  }, [db, userId, score, incorrectAnswers, gameHistory, getUserStatsFromFirebase]);

  const handleCloseMessage = () => {
    setIsMessageVisible(false);
  };

  useEffect(() => {
    const fetchPostGameMessage = async () => {
      const data = await prepareDataForOpenAI();
      const response = await fetch('https://us-central1-decodeme-1f38e.cloudfunctions.net/fetchPostGameMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      setPostGameMessage(responseData.postGameMessage);
      setIsMessageVisible(true); // Set the message to be visible only after the API call is successful
    };
    fetchPostGameMessage();
  }, [prepareDataForOpenAI]);

  return (
    isMessageVisible && (
      <div className="speech-bubble">
        <button className="close-button" onClick={handleCloseMessage}>&times;</button>
        {postGameMessage}
      </div>  
    )
  );
};

export default PostGameMessage;