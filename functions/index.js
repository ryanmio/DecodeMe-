const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.getCodeSnippet = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const gameMode = request.query.gameMode;
    let conversationHistory = request.body.conversationHistory || [];
    const userMessage = request.body.userMessage;
    const learningLevel = request.body.learningLevel || 'intermediate'; // Extract learning level from request body, default to 'intermediate'
    const customInstructions = request.body.customInstructions || {}; // Extract custom instructions from request body, default to an empty object
    console.log('Custom Instructions:', customInstructions); // Log the custom instructions

    if (!gameMode) {
      return response.status(400).send('Please provide a game mode.');
    }

    const openaiKey = functions.config().openai?.key;
    if (!openaiKey) {
      return response.status(500).send('Server configuration error.');
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    };

    // Include the user's answer in the conversation history
    if (userMessage) {
      conversationHistory = [...conversationHistory, { role: 'user', content: userMessage }];
    }

    // Determine the code snippet difficulty based on learning level
    let difficultyAdjustment = '';
    switch (learningLevel) {
      case 'beginner':
        difficultyAdjustment = 'The code snippet should be simple and easy to understand, suitable for a beginner.';
        break;
      case 'expert':
        difficultyAdjustment = 'The code snippet should be complex and challenging, suitable for an expert.';
        break;
      default:
      // No specific instruction for 'intermediate' or any other value
    }

    // Extract the codeGen custom instruction if it exists
    const customInstructionsCodeGen = customInstructions.codeGen ? customInstructions.codeGen : '';
    console.log('Code Generation Custom Instruction:', customInstructionsCodeGen); // Log the codeGen instruction

    const systemMessage = `You are a coding challenge generator. Generate a short Python script in a code block and two multiple choice options for what the code does. The first option should be the correct answer and the second option should be incorrect. Format the options like "A) [correct answer]\nB) [incorrect answer]". Ensure both options reasonable so the game is challenging. Adjust the difficulty based on the user's previous answer: make it noticeably harder if correct, and maintain the same level if incorrect. It is very important to incorporate fun elements like emojis, humor, and creative puzzles in your code scripts to keep the user engaged, and avoid math or boring code. Continue generating new questions regardless of the user's answer. Your responses should only include the script and answer choices, without any additional narration, commentary, or code comments. ${difficultyAdjustment} ${customInstructionsCodeGen}`;

    console.log('System message:', systemMessage); // Log the system message

    const data = {
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: systemMessage },
        ...(conversationHistory.length === 0 ? [{ role: 'user', content: `Generate a short python script in a code block and two multiple choice options for what the script does. Format the options like this: "A) [correct answer]\nB) [incorrect answer]". Both options should be plausible - the user wants a challenge. Start simple but increase the difficulty of the next script after each correct response. Incorporate fun elements like emojis, humor, and creative puzzles. Your message should only include a python script in a code block and the two answer choices, no greetings, small talk, narration, or commentary.` }] : []),
        ...conversationHistory,
      ]
    };

    try {
      const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
      const responseText = openaiResponse.data.choices[0].message.content.trim();
      const codeSnippetMatch = responseText.match(/```(.|\n)*?```/);
      const codeSnippet = codeSnippetMatch ? codeSnippetMatch[0] : '';
      response.send({ codeSnippet, conversationHistory: [...conversationHistory, { role: 'assistant', content: responseText }] });
    } catch (error) {
      if (error.response) {
        response.status(500).send('An error occurred while communicating with OpenAI.');
      }
    }
  });
});

// This function is a Firestore Trigger that gets triggered when a document in the 'users/{userId}/games/{gameId}' path is written.
// It extracts the game data from the written document and the user ID from the document path.
// The game data and user ID are then used to update the leaderboard collection in Firestore.
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

// Chat with Script Function -- This function is a HTTP Trigger that gets triggered when a POST request is made to the '/chatWithScript' endpoint.
// It extracts the script and user message from the request body.
// The script and user message are then used to generate a response from OpenAI's GPT-3.5-turbo model.
// The generated response is sent back in the HTTP response.
exports.chatWithScript = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const script = request.body.script;
    const userMessage = request.body.userMessage;
    const learningLevel = request.body.learningLevel || 'intermediate';
    const chatHistory = request.body.chatHistory || [];
    const userId = request.body.userId; // Extract userId from request body

    if (!script) {
      console.error('No script provided.');
      return response.status(400).send('Please provide a script.');
    }

    const openaiKey = functions.config().openai?.key;
    if (!openaiKey) {
      console.error('OpenAI key missing from Firebase function configuration.');
      return response.status(500).send('Server configuration error.');
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    };

    // Determine the tone and verbosity of the assistant based on learning level
    let assistantBehavior;
    switch (learningLevel) {
      case 'beginner':
        assistantBehavior = `You are an assistant explaining Python scripts to a young beginner with no coding background. Presently, the user is viewing the script: ${script}. Use very simple language suitable for an elementary school student. Break down coding concepts into easy-to-understand parts. Be patient and clear, using short sentences for a mobile-friendly experience. Avoid technical jargon and explain each step as if it's the user's first encounter with coding.`;
        break;
      case 'expert':
        assistantBehavior = `You are a helpful assistant. The user, with an advanced engineering degree, is viewing the Python script: ${script}. Assume deep technical knowledge and provide quick, direct responses. Focus on expert-level insights, omitting basic explanations. Keep responses brief, precise, and to the point, suitable for a quick mobile review.`;
        break;
      default:
        assistantBehavior = `You are an assistant guiding an intermediate learner through Python scripts. The user is looking at the script: ${script}. Assume basic familiarity with programming but explain more advanced concepts. Use clear, concise language that bridges fundamental understanding to more complex ideas. Keep explanations detailed yet accessible, and maintain mobile-friendly sentence lengths.`;
    }

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: assistantBehavior },
        ...chatHistory,
        { role: 'user', content: userMessage },
      ]
    };

    try {
      const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
      const responseText = openaiResponse.data.choices[0].message.content.trim();

      // Calculate tokens used
      const tokensUsed = openaiResponse.data.usage.total_tokens;
      console.log(`Tokens used by user ${userId}: ${tokensUsed}`); // Log tokens used

      // Update Firestore in the background
      const userRef = db.collection('users').doc(userId);
      userRef.update({
        gptCalls: admin.firestore.FieldValue.increment(1),
        gptTokens: admin.firestore.FieldValue.increment(tokensUsed)
      }).then(() => {
        console.log(`Updated gptCalls and gptTokens for user ${userId}`); // Log successful update
      }).catch(error => {
        console.error('Error updating Firestore:', error);
      });

      response.send({ response: responseText });
    } catch (error) {
      console.error('Error occurred while communicating with OpenAI:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
      response.status(500).send('An error occurred while communicating with OpenAI.');
    }
  });
});


/**
 * This function fetches a post-game message for the user. It uses the OpenAI API to generate a message
 * based on the user's score, incorrect answers, and user stats. The message is intended
 * to provide a short, encouraging feedback to the user about their game performance.
 */

exports.fetchPostGameMessage = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    console.log('Data received in fetchPostGameMessage:', request.body);
    const { score, incorrectAnswers, userStats, leaderboardName } = request.body;
    const openaiKey = functions.config().openai?.key;
    if (!openaiKey) {
      console.error('Server configuration error.');
      return response.status(500).send('Server configuration error.');
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    };

    const systemMessage = `You are an AI that reviews the user's game performance and provides a short, encouraging message.`;
    const userMessage = `My score is ${score}. I answered these questions incorrectly: ${incorrectAnswers}. My user stats are: ${userStats}. Refer to me by my username: ${leaderboardName}.`;

    console.log('System Message:', systemMessage);
    console.log('User Message:', userMessage);

    const conversationHistory = [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage }
    ];

    const data = {
      model: 'gpt-3.5-turbo',
      messages: conversationHistory
    };

    try {
      const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
      const postGameMessage = openaiResponse.data.choices[0].message.content.trim();
      response.send({ postGameMessage });
    } catch (error) {
      console.error('Error occurred while communicating with OpenAI:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
      response.status(500).send('An error occurred while communicating with OpenAI.');
    }
  });
});





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


/**
 * This function is a Firestore Trigger that gets triggered when a document in the 'users/{userId}' path is updated.
 * It checks the updated usage data (gptCalls and gptTokens) of the user.
 * If the user has exceeded the usage cap (100 calls or 10000 tokens), it updates the 'capExceeded' field of the user document to true.
 */

exports.checkUsageData = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
  const newValue = change.after.data();

  // Log the newValue object
  console.log('newValue:', newValue);

  // Default gptCalls and gptTokens to 0 if they're undefined
  const gptCalls = newValue.gptCalls || 0;
  const gptTokens = newValue.gptTokens || 0;

  console.log(`gptCalls: ${gptCalls}, gptTokens: ${gptTokens}`); // Log gptCalls and gptTokens

  const hasExceededCap = gptCalls >= 100 || gptTokens >= 10000;

  console.log(`hasExceededCap: ${hasExceededCap}`); // Log hasExceededCap

  if (hasExceededCap) {
    console.log('Updating capExceeded to true'); // Log before updating capExceeded
    return change.after.ref.update({ capExceeded: true });
  } else {
    console.log('Updating capExceeded to false'); // Log before updating capExceeded
    return change.after.ref.update({ capExceeded: false });
  }
});


/**
 * This Cloud Function resets the usage data for all users. It is triggered by Cloud Scheduler every day at midnight.
 * The function fetches all users and sets their gptCalls and gptTokens to 0.
 */
exports.resetUsageData = functions.pubsub.schedule('0 0 * * *').onRun(async (context) => {
  // Fetch all users
  const usersSnapshot = await admin.firestore().collection('users').get();
  const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  console.log(`Fetched ${users.length} users`);

  // Reset the usage data for each user
  for (const user of users) {
    console.log(`Resetting usage data for user ${user.id}`);

    await admin.firestore().collection('users').doc(user.id).update({
      gptCalls: 0,
      gptTokens: 0,
      capExceeded: false
    });

    console.log(`Reset usage data for user ${user.id}`);
  }

  console.log('Usage data reset for all users');
});