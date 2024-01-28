const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

exports.getCodeSnippet = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const gameMode = request.query.gameMode;

    let conversationHistory = request.body.conversationHistory || [];
    const userMessage = request.body.userMessage;
    const learningLevel = request.body.learningLevel || 'intermediate';
    const customInstructions = request.body.customInstructions || {};

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

    // Extract the playSimilar custom instruction if it exists
    const playSimilarScript = customInstructions.playSimilar;

    let systemMessage = `You are a coding challenge generator. Generate a short Python script in a code block and two multiple choice options for what the code does. The first option should be the correct answer and the second option should be incorrect. Format the options like "A) [correct answer]\nB) [incorrect answer]". Ensure both options reasonable so the game is challenging. Adjust the difficulty based on the user's previous answer: make it noticeably harder if correct, and maintain the same level if incorrect. It is very important to incorporate fun elements like emojis, humor, and creative puzzles in your code scripts to keep the user engaged, and avoid math or boring code. Continue generating new questions regardless of the user's answer. Your responses should only include the script and answer choices, without any additional narration, commentary, or code comments. ${difficultyAdjustment} ${customInstructionsCodeGen}`;

    // If playSimilarScript is provided, adjust the systemMessage to ask for a similar script
    if (playSimilarScript) {
      systemMessage += ` The user specifially asked for scripts similar to the following example: ${playSimilarScript}.`;
    }

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
      console.error('Error:', error); // Log any errors
      if (error.response) {
        response.status(500).send('An error occurred while communicating with OpenAI.');
      }
    }
  });
});
