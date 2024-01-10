const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * This Cloud Function resets the usage data for non-anonymous users. It is triggered by Cloud Scheduler every day at midnight.
 * The function fetches all users and sets their gptCalls and gptTokens to 0 if they are not anonymous.
 * Before resetting, it increments lifetimeGptCalls and lifetimeGptTokens fields by the current values of gptCalls and gptTokens.
 */
exports.resetUsageData = functions.pubsub.schedule('0 0 * * *').onRun(async (context) => {
  // Fetch all users
  const usersSnapshot = await admin.firestore().collection('users').get();
  const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  console.log(`Fetched ${users.length} users`);

  // Initialize a batch
  let batch = admin.firestore().batch();
  let operationCount = 0;

  // Reset the usage data for each non-anonymous user
  for (const user of users) {
    if (!user.isAnonymous) {
      console.log(`Resetting usage data for user ${user.id}`);

      const userRef = admin.firestore().collection('users').doc(user.id);

      // Increment lifetimeGptCalls and lifetimeGptTokens by the current values of gptCalls and gptTokens
      batch.update(userRef, {
        lifetimeGptCalls: admin.firestore.FieldValue.increment(user.gptCalls || 0),
        lifetimeGptTokens: admin.firestore.FieldValue.increment(user.gptTokens || 0),
        gptCalls: 0,
        gptTokens: 0,
        capExceeded: false
      });

      operationCount++;

      // If the batch has 500 operations, commit the batch and start a new one
      if (operationCount === 500) {
        await batch.commit();
        batch = admin.firestore().batch();
        operationCount = 0;
      }
    }
  }

  // Commit the remaining operations in the batch
  if (operationCount > 0) {
    await batch.commit();
  }

  console.log('Usage data reset for non-anonymous users');
});
