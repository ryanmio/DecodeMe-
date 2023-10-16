var admin = require("firebase-admin");

var serviceAccount = require("./decodeme-1f38e-firebase-adminsdk-j6zn0-8494efde02.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
