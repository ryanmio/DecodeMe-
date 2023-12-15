// app/src/components/PostGameMessage.js
import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';

const PostGameMessage = ({ db, userId, score, incorrectAnswers, gameHistory }) => {
  const [postGameMessage, setPostGameMessage] = useState('');

  const getUserStatsFromFirebase = async () => {
    console.log('Fetching user stats from Firebase...');
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log('User stats fetched successfully.');
      return userDoc.data();
    } else {
      console.error('No such user document!');
      return null;
    }
  };

  const formatIncorrectAnswers = (incorrectAnswers) => {
    return incorrectAnswers.join(', ');
  };

  const prepareDataForOpenAI = async () => {
    console.log('Preparing data for OpenAI...');
    const userStats = await getUserStatsFromFirebase();
    const formattedIncorrectAnswers = formatIncorrectAnswers(incorrectAnswers);
    const data = {
      score,
      incorrectAnswers: formattedIncorrectAnswers,
      gameHistory,
      userStats
    };
    console.log('Data prepared successfully.');
    return data;
  };

  useEffect(() => {
    const fetchPostGameMessage = async () => {
      console.log('Fetching post game message...');
      const data = await prepareDataForOpenAI();
      const response = await fetch('https://us-central1-decodeme-1f38e.cloudfunctions.net/fetchPostGameMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      console.log('Post game message fetched successfully.');
      setPostGameMessage(responseData.postGameMessage);
    };
    fetchPostGameMessage();
  }, []);

  return (
    <div class="speech-bubble">
    <button class="close-button">&times;</button>
    {postGameMessage}
  </div>  
  );
};

export default PostGameMessage;