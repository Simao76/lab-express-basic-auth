'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

// Sign Up
router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { name, password } = req.body;
  // We need to hash the password submitted by the user
  // so that it can be securely stored in the database
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      // Now that we have the value of the hashed password,
      // create the user
      return User.create({
        name,
        passwordHash: hash
      });
    })
    .then(user => {
      // User was securely created
      // Save it's ID to the session (we call this process serialization),
      // so that it can later be loaded from the database and
      // bound to the request with req.body (deserialization)
     /*  req.session.user = user._id; */
      res.redirect('/');
    })
    .catch(error => {
      // If there was an error in the promise chain,
      // send to the error handler
      next(error);
    });
});


module.exports = router;
