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
      user: userData
    });
  })(req, res, next);
});

router.get('/facebook', passport.authenticate('facebook-login', { scope: 'email' } ));

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook-login', (err, token, userData) => {
    if (err) {
      return res.status(400).json({
        message: 'Could not process the form.',
      });
    }
    res.set('token', token);
    // console.log(res);
    res.redirect('/#/');
    // return res.json({
    //   message: 'You have successfully logged in!',
    //   token,
    //   user: userData,
    // });
  })(req, res, next);
});

// router.get('/facebook/callback', (req, res, next) => {
//   return passport.authenticate('facebook-login', (err, token, userData) => {
//     if (err) {
//       return res.status(400).json({
//         success: false,
//         message: 'Facebook Signup unsucessful',
//       });
//     }
//
//     return res.json({
//       success: true,
//       message: 'Facebook login success!',
//     })
//   })
// })

module.exports = router;
