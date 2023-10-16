var admin = require('./firebase_init');

function signUp(email, password) {
  return admin.auth().createUser({
    email: email,
    password: password,
  });
}

function signIn(email, password) {
  // This is a simplified version. In a real-world application, you'd also need to check the password and generate a JWT.
  return admin.auth().getUserByEmail(email);
}

function validateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken; // Attach decoded token to request object
      next(); // Proceed to the next middleware or route handler
    })
    .catch((error) => {
      return res.status(403).json({ message: 'Invalid token' });
    });
}

module.exports = { signUp, signIn, validateToken };