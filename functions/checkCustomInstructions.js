// functions/checkCustomInstructions.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

exports.checkCustomInstructions = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const oldValue = change.before.data();

    // Check if customInstructions field has been updated
    if (newValue.customInstructions !== oldValue.customInstructions) {
      const customInstructions = newValue.customInstructions;

      // OpenAI API call
      const openaiKey = functions.config().openai?.key;
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      };

      const data = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an AI that checks if a text is safe.' },
          { role: 'user', content: customInstructions },
        ]
      };

      try {
        const openaiResponse = await axios.post(apiUrl, data, { headers: headers });
        const responseText = openaiResponse.data.choices[0].message.content.trim();

        // If the response is "unsafe", clear the custom instructions
        if (responseText.toLowerCase() === 'unsafe') {
          await change.after.ref.update({ customInstructions: '' });
        }

      } catch (error) {
        console.error('An error occurred while communicating with OpenAI:', error);
      }
    }
  });