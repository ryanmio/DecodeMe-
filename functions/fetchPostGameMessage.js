const functions = require('firebase-functions');
const axios = require('axios');
const { cors, db } = require('.');

/**
 * This function fetches a post-game message for the user. It uses the OpenAI API to generate a message
 * based on the user's score, incorrect answers, and user stats. The message is intended
 * to provide a short, encouraging feedback to the user about their game performance.
 */
exports.fetchPostGameMessage = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    console.log('Data received in fetchPostGameMessage:', request.body);
    const { score, incorrectAnswers, userStats, leaderboardName, userId } = request.body;
    const openaiKey = functions.config().openai?.key;
    if (!openaiKey) {
      console.error('Server configuration error.');
      return response.status(500).send('Server configuration error.');
    }

    // Fetch the user's custom instructions from Firestore
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const customInstructions = userDoc.data().customInstructions || {}; // Extract custom instructions from user document, default to an empty object
    const customInstructionsChatbot = customInstructions.chatbot ? customInstructions.chatbot : '';

    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    };

    const systemMessage = `You are an AI that reviews the user's game performance and provides a short, encouraging message. ${customInstructionsChatbot}`;
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
