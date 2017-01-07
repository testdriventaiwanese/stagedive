const jwt = require('jsonwebtoken');
const PassportFacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../user/userModel');

module.exports = new PassportFacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'picture', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  console.log('Facebook Profile Data: ', profile);
  userModel.users.getPassword(profile.emails[0].value, (results) => {
    if (results.length > 0 && results.password) {
      return done('Error, email has already been used');
    }
    if (results.length === 0) {
      const params = [profile.emails[0].value, null, profile.displayName, profile.photos[0].value]
      userModel.users.addOne(params, (response) => {
        if (!response) {
          console.log('Error adding facebook user to database in Passport Strategy');
          return done('Error adding facebook user to database in Passport Strategy');
        }
        userModel.users.findById(response.insertId, (userInfo) => {
          const info = {
            sub: userInfo[0].id,
          }
          const userToken = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
          const userId = userInfo[0].id;
          return done(null, userToken, userId);
        });
      });
    } else {
      const payload = {
        sub: results[0].id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
      const data = results[0].id;
      return done(null, token, data);
    }
  });
});
