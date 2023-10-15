const functions = require('firebase-functions');
const axios = require('axios');

exports.getGpt4Chat = functions.https.onRequest(async (request, response) => {
    const userMessage = request.body.userMessage;
    if (!userMessage) {
        console.error('No user message provided.');
        return response.status(400).send('Please provide a user message.');
    }
    console.log(`Received user message: ${userMessage}`);

    const openaiKey = functions.config().openai?.key;
    if (!openaiKey) {
        console.error('OpenAI key missing from Firebase function configuration.');
        return response.status(500).send('Server configuration error.');
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Authorization': `Bearer ${functions.config().openai.key}`,
        'Content-Type': 'application/json',
    };
    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage }
        ]
    };

    try {
        const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
        console.log(`Received response from OpenAI: ${JSON.stringify(openaiResponse.data)}`);
        response.send(openaiResponse.data.choices[0].message.content.trim());
    } catch (error) {
        console.error('Error occurred while communicating with OpenAI:', error);
        if (error.response) {
            console.error('Error Response:', error.response.data);
        }
        response.status(500).send('An error occurred while communicating with OpenAI.');
    }
});
