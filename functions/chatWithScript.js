const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const { cors, db } = require('.');

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
    const userId = request.body.userId;

    if (!script) {
      return response.status(400).send('Please provide a script.');
    }

    const openaiKey = functions.config().openai?.key;
    if (!openaiKey) {
      console.error('OpenAI key missing from Firebase function configuration.');
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

    // Determine the tone and verbosity of the assistant based on learning level
    let assistantBehavior;
    switch (learningLevel) {
      case 'beginner':
        assistantBehavior = `You are an assistant explaining Python scripts to a young beginner with no coding background. Presently, the user is viewing the script: ${script}. Use very simple language suitable for an elementary school student. Break down coding concepts into easy-to-understand parts. Be patient and clear, using short sentences for a mobile-friendly experience. Avoid technical jargon and explain each step as if it's the user's first encounter with coding. ${customInstructionsChatbot}`;
        break;
      case 'expert':
        assistantBehavior = `You are a helpful assistant. The user, with an advanced engineering degree, is viewing the Python script: ${script}. Assume deep technical knowledge and provide quick, direct responses. Focus on expert-level insights, omitting basic explanations. Keep responses brief, precise, and to the point, suitable for a quick mobile review. ${customInstructionsChatbot}`;
        break;
      default:
        assistantBehavior = `You are an assistant guiding an intermediate learner through Python scripts. The user is looking at the script: ${script}. Assume basic familiarity with programming but explain more advanced concepts. Use clear, concise language that bridges fundamental understanding to more complex ideas. Keep explanations detailed yet accessible, and maintain mobile-friendly sentence lengths. ${customInstructionsChatbot}`;
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

      // Update Firestore in the background
      userRef.update({
        gptCalls: admin.firestore.FieldValue.increment(1),
        gptTokens: admin.firestore.FieldValue.increment(tokensUsed)
      }).catch(error => { });

      response.send({ response: responseText });
    } catch (error) {
      if (error.response) { }
      response.status(500).send('An error occurred while communicating with OpenAI.');
    }
  });
});
