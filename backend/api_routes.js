// backend/firebase_functions/api_routes.js

var express = require('express');
var router = express.Router();
var { signUp, signIn, validateToken } = require('./auth');

// Sign up route
router.post('/signup', function(req, res) {
  const { email, password } = req.body;
  
  signUp(email, password)
    .then(userRecord => res.json({ user: userRecord }))
    .catch(error => res.status(400).json({ error: error.message }));
});

// Sign in route
router.post('/signin', function(req, res) {
  const { email, password } = req.body;
  
  signIn(email, password)
    .then(user => res.json({ user: user })) // In a real-world application, you'd return a JWT here
    .catch(error => res.status(400).json({ error: error.message }));
});

// A protected route
router.get('/protected', validateToken, function(req, res) {
  // This route is protected, it will only be accessible if the JWT token is valid
  res.json({ message: 'You accessed a protected route!' });
});

module.exports = router;