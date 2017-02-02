const jwt = require('jsonwebtoken');
const PassportFacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../user/userModel');

module.exports = new PassportFacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://stagedive.co/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'picture', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  // once authenticated by fb, attempt to get password using email from facebook response
  userModel.getPassword(profile.emails[0].value)
  .then((results) => {
    if (results.length > 0 && results.password) {
      return done('Error, email has already been used');
    }
    if (results.length === 0) {
      // create new user if no email exists

      const params = [profile.emails[0].value, null, profile.displayName, profile.photos[0].value]
      userModel.addOne(params)
      .then((response) => {
        if (!response) {
          console.log('Error adding facebook user to database in Passport Strategy');
          return done('Error adding facebook user to database in Passport Strategy');
        }

        // after creation, query for account information to send back up
        userModel.findById(response[0])
        .then((userInfo) => {
          const info = {
            sub: userInfo[0].id,
          }
          const userToken = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
          const userId = userInfo[0].id;
          return done(null, userToken, userId);
        });
      });
    } else {
      // if user exists, continue with standard sign in

      const payload = {
        sub: results[0].id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
      const data = results[0].id;
      return done(null, token, data);
    }
  });
});
