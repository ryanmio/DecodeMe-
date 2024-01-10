const functions = require('firebase-functions');

/**
 * This function is a Firestore Trigger that gets triggered when a document in the 'users/{userId}' path is updated.
 * It checks the updated usage data (gptCalls and gptTokens) of the user.
 * If the user has exceeded the usage cap (100 calls or 10000 tokens), it updates the 'capExceeded' field of the user document to true.
 */
exports.checkUsageData = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
  const newValue = change.after.data();
  const oldValue = change.before.data();

  // Log the newValue object
  console.log('newValue:', newValue);

  // Default gptCalls, gptTokens, gptCallsCap, and gptTokensCap to 0 if they're undefined
  const gptCalls = newValue.gptCalls || 0;
  const gptTokens = newValue.gptTokens || 0;
  const gptCallsCap = newValue.gptCallsCap || 100;
  const gptTokensCap = newValue.gptTokensCap || 100000;

  console.log(`gptCalls: ${gptCalls}, gptTokens: ${gptTokens}`); // Log gptCalls and gptTokens

  const hasExceededCap = gptCalls >= gptCallsCap || gptTokens >= gptTokensCap;

  console.log(`hasExceededCap: ${hasExceededCap}`); // Log hasExceededCap


  // Only update capExceeded if its new value is different from the current one
  if (hasExceededCap !== oldValue.capExceeded) {
    if (hasExceededCap) {
      console.log('Updating capExceeded to true'); // Log before updating capExceeded
      return change.after.ref.update({ capExceeded: true });
    } else {
      console.log('Updating capExceeded to false'); // Log before updating capExceeded
      return change.after.ref.update({ capExceeded: false });
    }
  } else {
    return null; // No update needed
  }
});
