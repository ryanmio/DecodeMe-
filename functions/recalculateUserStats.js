const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * This Cloud Function recalculates various user statistics upon the completion of a game.
 * It is designed to be invoked directly via a callable method from the client application.
 * The statistics recalculated include the user's average score, high score,
 * and the number of games played within the last 24 hours, 7 days, and 30 days, as well as the lifetime total.
 * These recalculated statistics are then updated in the user's document to reflect their most recent gaming activity.
 */
exports.recalculateUserStats = functions.https.onCall(async (data, context) => {
  // Log the raw input data
  console.log('Received data:', JSON.stringify(data));

  const { userId } = data;

  // Log the extracted userId
  console.log('Extracted userId:', userId);

  if (!userId) {
    console.error('No userId provided.');
    return null;
  }

  const db = admin.firestore();
  const userRef = db.collection('users').doc(userId);

  // Fetch the user document to check if the user is anonymous
  const userDoc = await userRef.get();

  // Check if the user document exists and has the 'leaderboardName' field
  if (!userDoc.exists || !userDoc.data().leaderboardName) {
    console.log(`Skipping stats calculation for anonymous or incomplete user: ${userId}`);
    return null; // Exit the function if the user is anonymous or the document is incomplete
  }

  const gameHistoryRef = db.collection('users').doc(userId).collection('games');
  const gameHistorySnapshot = await gameHistoryRef.get();
  const gameHistory = gameHistorySnapshot.docs.map(doc => doc.data());

  // Log the game history
  console.log(`Fetched ${gameHistory.length} games for user: ${userId}`);

  // Filter out games with undefined scores
  const validGames = gameHistory.filter(game => game.score !== undefined);

  // Initialize stats
  let totalScore = 0;
  let highScore = 0;

  const now = admin.firestore.Timestamp.now();

  // Sort games by timestamp descending
  validGames.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());

  // Calculate stats
  validGames.forEach((game, index) => {
    // Log the score of each game
    console.log(`Score of valid game ${index}:`, game.score);

    totalScore += game.score;
    if (game.score > highScore) highScore = game.score;
  });

  const averageScore = (totalScore / validGames.length).toFixed(2);

  // Log the total score and average score
  console.log(`Total score for user ${userId}:`, totalScore);
  console.log(`Average score for user ${userId}:`, averageScore);

  // Initialize game counts for each learning level
  const gameCountsByLevel = {
    beginner: 0,
    intermediate: 0,
    expert: 0,
  };

  // Calculate the game counts for each learning level
  for (const game of validGames) {
    const level = game.learningLevel || 'intermediate'; // Use 'intermediate' as the default level
    gameCountsByLevel[level]++;
  }

  // Calculate the lifetime score
  let lifetimeScore = validGames.reduce((acc, game) => acc + game.score, 0);

  // Log the calculated stats before updating Firestore
  console.log(`Final stats for user: ${userId}`, {
    averageScore,
    highScore,
    totalGames: validGames.length,
    gameCountsByLevel,
    lifetimeScore // Log the lifetime score
  });

  console.log(`Updating stats for user: ${userId}`);

  // Update the user's stats in Firestore
  await userRef.set({
    averageScore,
    highScore,
    totalGames: validGames.length,
    gameCountsByLevel,
    lifetimeScore // Update the lifetime score in Firestore
  }, { merge: true });

  // Log a message after updating Firestore
  console.log(`Updated stats for user: ${userId} in Firestore`);
});
