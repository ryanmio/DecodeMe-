const functions = require('firebase-functions');

/**
 * This function is a Firestore Trigger that gets triggered when a new document in the 'users/{userId}' path is created.
 * It adds gptCallsCap and gptTokensCap fields to the new user's document with initial values of 100 and 100,000 respectively.
 */
exports.initializeUserCaps = functions.firestore.document('users/{userId}').onCreate((snap, context) => {
  const userRef = snap.ref;

  return userRef.update({
    gptCallsCap: 100,
    gptTokensCap: 100000
  });
});
