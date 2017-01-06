const jwt = require('jsonwebtoken');
const PassportFacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../user/userModel');

module.exports = new PassportFacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email'],
}, (accessToken, refreshToken, profile, done) => {
    console.log('FACEBOOK PASSPORT PROFILE: ', profile);
  userModel.users.getPassword(profile.emails[0].value, (results) => {
    console.log('facebook auth results: ', results);
    if (results.length === 0) {
      return done('Error, no user found');
    }

    const payload = {
      sub: results[0].id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    const data = {
      name: results[0].fullname,
      id: results[0].id,
    };

    done(null, token, data);
  });
});
