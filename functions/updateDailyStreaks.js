const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * This Cloud Function updates the daily streaks for all users. It is triggered by Cloud Scheduler every day at midnight.
 * The function fetches all users and their game histories, calculates the streak for each user, and updates the user's streak in Firestore.
 * The streak is calculated by sorting the games by date and counting the consecutive days with games.
 */
exports.updateDailyStreaks = functions.pubsub.schedule('0 0 * * *').onRun(async (context) => {
  // Helper function to check if two dates are on the same day
  function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  // Fetch all users
  const usersSnapshot = await admin.firestore().collection('users').get();
  const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  console.log(`Fetched ${users.length} users`);

  // Calculate the streak and games in time frames for each user
  for (const user of users) {
    console.log(`Processing user ${user.id}`);

    const gameHistorySnapshot = await admin.firestore().collection('users').doc(user.id).collection('games').get();
    const gameHistory = gameHistorySnapshot.docs.map(doc => ({ ...doc.data(), timestamp: doc.data().timestamp.toDate() }));

    console.log(`Fetched ${gameHistory.length} games for user ${user.id}`);

    // Sort games by timestamp
    gameHistory.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    let streak = 0;
    let gamesLast24Hours = 0;
    let gamesLast7Days = 0;
    let gamesLast30Days = 0;
    let currentDate = new Date();

    for (const game of gameHistory) {
      console.log(`Processing game with timestamp ${game.timestamp}`);

      // Calculate games in time frames
      let timeDiffHours = (currentDate.getTime() - game.timestamp.getTime()) / (1000 * 60 * 60);
      if (timeDiffHours < 24) gamesLast24Hours++;
      if (timeDiffHours < 24 * 7) gamesLast7Days++;
      if (timeDiffHours < 24 * 30) gamesLast30Days++;

      // Calculate streak
      if (isSameDay(game.timestamp, currentDate)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        const previousDay = new Date(currentDate);
        previousDay.setDate(previousDay.getDate() - 1);
        if (isSameDay(game.timestamp, previousDay)) {
          currentDate = previousDay;
          streak++;
        } else {
          break;
        }
      }
    }

    console.log(`Calculated streak of ${streak} for user ${user.id}`);
    console.log(`Games in last 24 hours: ${gamesLast24Hours}`);
    console.log(`Games in last 7 days: ${gamesLast7Days}`);
    console.log(`Games in last 30 days: ${gamesLast30Days}`);

    // Update the user's streak and games in time frames in Firestore
    await admin.firestore().collection('users').doc(user.id).update({
      currentStreak: streak,
      gamesLast24Hours,
      gamesLast7Days,
      gamesLast30Days
    });

    console.log(`Updated streak and games in time frames for user ${user.id}`);
  }

  console.log('Daily streaks and games in time frames updated for all users');
});
