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
    const learningLevel = request.body.learningLevel || 'intermediate'; // Extract learning level from request body, default to 'intermediate'

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

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are a coding challenge generator. After each user response, generate a short Python script in a code block and two multiple choice options for what the code does. The first option should be the correct answer and the second option should be incorrect. Format the options like "A) [correct answer]\nB) [incorrect answer]". Make both options reasonable so the game is challenging. Adjust the difficulty based on the user's previous answer: make it slightly harder if correct, and maintain the same level if incorrect. It is very important to incorporate fun elements like emojis, humor, and creative puzzles in your code scripts to keep the user engaged, and avoid math or boring code. Continue generating new questions regardless of the user's answer. Your responses should only include the script and answer choices, without any additional narration, commentary, or code comments. ${difficultyAdjustment}` },
        ...(conversationHistory.length === 0 ? [{ role: 'user', content: `Generate a short python script in a code block and two multiple choice options for what the script does. Format the options like this: "A) [correct answer]\nB) [incorrect answer]". Both answer options should be reasonable to make it challenging. Start super simple – when I respond correctly, increase the difficulty of the next script, otherwise generate a similar script. Incorporate fun elements like emojis, humor, and creative puzzles. Only respond with scripts and answer choices, no small talk or narration or comments.` }] : []),
        ...conversationHistory,
      ]
    };

    console.log('Data sent to OpenAI:', data);

    try {
      const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
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

    console.log('Data sent to OpenAI:', data);

    try {
      const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
      const responseText = openaiResponse.data.choices[0].message.content.trim();
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