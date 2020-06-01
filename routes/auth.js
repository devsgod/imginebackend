const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// user model
let User = require('../models/user.model');

// @route   POST /auth/
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if(!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    console.log(email, password);
    // Check for existing user
    User.findOne({ email })
      .then(user => {
        if(!user) return res.status(400).json({ msg: 'User Does not exist' });
  
        // Validate password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
            jwt.sign(
              { id: user.id },
              process.env.jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if(err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.username,
                    email: user.email
                  }
                });
              }
            )
          })
      })
  });
  
  // @route   GET /auth/user
  // @desc    Get user data
  // @access  Private
  router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
  });

module.exports = router;