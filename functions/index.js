const functions = require('firebase-functions');
const axios = require('axios');

exports.getCodeSnippet = functions.https.onRequest(async (request, response) => {
  const gameMode = request.query.gameMode;
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
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: `Let’s play a game that also teaches me python scripts. You will write a short python script in a code block and give me two multiple choice options for what the code does. The first option should be the correct answer and the second option should be incorrect. Format the options like this: "A) [correct answer] / B) [incorrect answer]". If I get it right, continue with a slightly harder script. If I get it wrong, continue with a similar script. Don’t stop until I say so.` }
    ]
  };

  try {
    const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
    console.log(`Received response from OpenAI: ${JSON.stringify(openaiResponse.data)}`);
    response.send({ codeSnippet: openaiResponse.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error occurred while communicating with OpenAI:', error);
    if (error.response) {
      console.error('Error Response:', error.response.data);
    }
    response.status(500).send('An error occurred while communicating with OpenAI.');
  }
});
