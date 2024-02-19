// functions/generateLeaderboardName.js
const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('./index').cors;

exports.generateLeaderboardName = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const openaiKey = functions.config().openai?.key;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'system', 
          content: `You are a leaderboard name generator for DecodeMe!, a web-based coding game. Generate unique and fun leaderboard names by creatively combining coding terms with random animal names, elements from the periodic table, and names of famous female scientists. Make sure the names are playful and easy to relate to, appealing to a wide audience. Examples of animals could be 'Panda', 'Pangolin', 'Axolotl'; elements like 'Carbon', 'Helium', 'Oxygen'; and famous female scientists such as 'Curie', 'Franklin', 'Hopper'. Blend these with coding-related words to create funny and memorable leaderboard names. Use numbers and symbols to ensure uniqueness. Ensure the names are culturally sensitive and inclusive.` 
        },
        { role: 'user', content: 'Generate a unique leaderboard name. Respond with only the leaderboard name, nothing else.' },
      ],
      temperature: 1.35,
      max_tokens: 50
    };

    try {
      const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
      const leaderboardName = openaiResponse.data.choices[0].message.content.trim();
      response.send({ leaderboardName });
    } catch (error) {
      console.error('Error occurred while communicating with OpenAI:', error);
      response.status(500).send('An error occurred while communicating with OpenAI.');
    }
  });
});