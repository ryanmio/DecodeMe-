const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// This function is an HTTP Cloud Function that receives a game mode and a user message as input.
// It communicates with the OpenAI API to generate a Python code snippet based on the game mode and user message.
// The generated code snippet and the conversation history are returned in the response.
exports.getCodeSnippet = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const gameMode = request.query.gameMode;
    let conversationHistory = request.body.conversationHistory || [];
    const userMessage = request.body.userMessage;
    if (!gameMode) {
      console.error('No game mode provided.');
      return response.status(400).send('Please provide a game mode.');
    }
    console.log(`Received game mode: ${gameMode}`);

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

    // Include the user's answer in the conversation history
    if (userMessage) {
      conversationHistory = [...conversationHistory, { role: 'user', content: userMessage }];
    }

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant. After each user response, generate a new Python script and two multiple choice options for what the code does. The first option should be the correct answer and the second option should be incorrect. Format the options like this: "A) [correct answer]\nB) [incorrect answer]". Continue generating new questions regardless of the user\'s answer.' },
        ...(conversationHistory.length === 0 ? [{ role: 'user', content: `Let’s play a game that also teaches me python scripts. You will write a short python script in a code block and give me two multiple choice options for what the code does. The first option should be the correct answer and the second option should be incorrect. Format the options like this: "A) [correct answer]\nB) [incorrect answer]". If I get it right, continue with a slightly harder script. If I get it wrong, continue with a similar script. Only respond with scripts and answer choices, no small talk. Don’t stop until I say so.` }] : []),
        ...conversationHistory,
      ]
    };

    try {
      const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
      console.log(`Received response from OpenAI: ${JSON.stringify(openaiResponse.data)}`);
      const responseText = openaiResponse.data.choices[0].message.content.trim();
      const codeSnippetMatch = responseText.match(/```(.|\n)*?```/);
      const codeSnippet = codeSnippetMatch ? codeSnippetMatch[0] : '';
      response.send({ codeSnippet, conversationHistory: [...conversationHistory, { role: 'assistant', content: responseText }] });
    } catch (error) {
      console.error('Error occurred while communicating with OpenAI:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
      response.status(500).send('An error occurred while communicating with OpenAI.');
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
    };

    await admin.firestore().collection('leaderboard').add(leaderboardData);
  });