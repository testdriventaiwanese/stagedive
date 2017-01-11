const express = require('express');
const passport = require('passport');

const router = new express.Router();

router.post('/signup', (req, res, next) => {
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.',
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  return passport.authenticate('local-login', (err, token, userId) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Login Failed.',
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      userId,
    });
  })(req, res, next);
});

router.get('/facebook', passport.authenticate('facebook-login', { scope: 'email' } ));

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook-login', (err, token, userId) => {
    if (err) {
      console.log('Error with facebook login: ', err);
      return res.redirect('/#/login');
    }
    const tokenStr = encodeURIComponent(token + userId);
    res.redirect(`/#/token/${tokenStr}`);
  })(req, res, next);
});

module.exports = router;
