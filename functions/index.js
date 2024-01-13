const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
exports.cors = cors;

admin.initializeApp();
const db = admin.firestore();
exports.db = db;

exports.getCodeSnippet = require('./getCodeSnippet').getCodeSnippet;
exports.updateLeaderboard = require('./updateLeaderboard').updateLeaderboard;
exports.chatWithScript = require('./chatWithScript').chatWithScript;
exports.fetchPostGameMessage = require('./fetchPostGameMessage').fetchPostGameMessage;
exports.recalculateUserStats = require('./recalculateUserStats').recalculateUserStats;
exports.updateDailyStreaks = require('./updateDailyStreaks').updateDailyStreaks;
exports.checkUsageData = require('./checkUsageData').checkUsageData;
exports.resetUsageData = require('./resetUsageData').resetUsageData;
exports.initializeUserCaps = require('./initializeUserCaps').initializeUserCaps;
exports.checkCustomInstructions = require('./checkCustomInstructions').checkCustomInstructions;
exports.generateLeaderboardName = require('./generateLeaderboardName').generateLeaderboardName;

/*
 * Instructions for adding new functions:
 * 
 * 1. In the functions directory, create a new JavaScript file for your function. The filename should be descriptive of the function's purpose (e.g., `sendEmail.js`).
 * 
 * 2. In the new file, write your Cloud Function following the Firebase Functions API. Make sure to export your function at the end of the file. For example:
 * 
 *    const functions = require('firebase-functions');
 *    exports.myNewFunction = functions.https.onRequest((request, response) => {
 *      // Your function logic here
 *    });
 * 
 * 3. In your `index.js` file, import and re-export the new function. Add a line like this:
 * 
 *    exports.myNewFunction = require('./myNewFunction').myNewFunction;
 * 
 * 4. Use the Firebase Emulator Suite to test your function locally before deploying it.
 * 
 * 5. Once you're confident that your function works as expected, deploy it to Firebase.
 */
