const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
exports.cors = cors;

admin.initializeApp();
const db = admin.firestore();
exports.db = db;

exports.getCodeSnippet = require('./functions/getCodeSnippet').getCodeSnippet;
exports.updateLeaderboard = require('./functions/updateLeaderboard').updateLeaderboard;
exports.chatWithScript = require('./functions/chatWithScript').chatWithScript;
exports.fetchPostGameMessage = require('./functions/fetchPostGameMessage').fetchPostGameMessage;
exports.recalculateUserStats = require('./functions/recalculateUserStats').recalculateUserStats;
exports.updateDailyStreaks = require('./functions/updateDailyStreaks').updateDailyStreaks;
exports.checkUsageData = require('./functions/checkUsageData').checkUsageData;
exports.resetUsageData = require('./functions/resetUsageData').resetUsageData;
exports.initializeUserCaps = require('./functions/initializeUserCaps').initializeUserCaps;
