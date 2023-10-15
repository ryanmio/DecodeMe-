const functions = require('firebase-functions');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: functions.config().openai.key });

exports.getGpt4Completion = functions.https.onRequest(async (request, response) => {
    const prompt = request.query.prompt;
  
    try {
      const gptResponse = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 60
      });
  
      response.send(gptResponse.choices[0].text.trim());
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred while communicating with GPT-4.');
    }
  });
