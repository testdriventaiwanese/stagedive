const userModel = require('../user/userModel');
const PassportLocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    fullname: req.body.fullname.trim(),
  };
  userModel.users.findOne(userData.email, (response) => {
    if (response.length > 0) {
      console.log('Username already exists');
      return done('Username already exists');
    }
    bcrypt.hash(userData.password, null, null, ((err, hash) => {
      const params = [userData.email, hash, userData.fullname, null];
      userModel.users.addOne(params, (resp) => {
        if (!resp) {
          console.log('Issue in adding to database');
          return done('Error adding user to db');
        }
        console.log('Signup Successful!');
        return done(null);
      });
    }));
  });
});
