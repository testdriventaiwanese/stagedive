const express = require('express');
const passport = require('passport');

const router = new express.Router();

router.post('/signup', (req, res, next) => {
  console.log('GOT TO THE SIGNUP ROUTE!!!!!');
  return passport.authenticate('local-signup', (err) => {
    console.log('GOT TO THE PASSPORT ATHENTICATE THING IN AUTH.JS');
    if (err) {
      console.log('GOT TO THE ERRRRR THING IN AUTH.JS');
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }
          console.log('GOT TO THE PAST ERRRRR THING IN AUTH.JS');
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.',
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});


module.exports = router;
