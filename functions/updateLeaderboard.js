const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.updateLeaderboard = functions.firestore
  .document('users/{userId}/games/{gameId}')
  .onWrite(async (change, context) => {
    const gameData = change.after.data();
    const { userId } = context.params;

    const leaderboardData = {
      leaderboardName: gameData.leaderboardName,
      score: gameData.score,
      userId,
      date: gameData.timestamp, // Use the timestamp from the game data
      longestStreak: gameData.longestStreak, // Assuming this data is available in gameData
      language: 'python', // Hardcoded for now, you can modify this as per your application's needs
    };

    await admin.firestore().collection('leaderboard').add(leaderboardData);
  });
