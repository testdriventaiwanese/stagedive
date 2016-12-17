const userModel = require('./userModel');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  users: {
    signin({ body: { username, password } }, res) {
      //plucked username and password from req.body, accessible by scope.
      //query for password using username, if result is empty then send error.
      //with successful response, use bcrypt compare with password from req.body
      //send jwt encoded username
      userModel.users.getPassword(username, (results) => {
        if (results.length === 0) {
          console.log('ERROR no password found');
          res.sendStatus(401);
        } else {
          bcrypt.compare(password, results[0].password, ((err, response) => {
            if (!response) {
              console.log('Password did not match in compare');
              res.sendStatus(401);
            } else {
              const token = jwt.encode(username, 'secret');
              res.json({ token });
            }
          }));
        }
      });
    },

    signup({ body: { username, password } }, res, next) {
      //plucked username and password from req.body, accessible by scope.
      //hash password with bcrypt, add to params array which will be passed down through the query
      //response body contains no information useful, if query is successful and a response comes back,
      //encode the username and send it up to the front
      bcrypt.hash(password, null, null, ((err, hash) => {
        const params = [username, hash];
        userModel.users.addOne(params, (response) => {
          if (!response) {
            console.log('Issue in adding to database');
            res.sendStatus(401);
          } else {
            const token = jwt.encode(username, 'secret');
            res.json({ token });
          }
        });
      }));
    },
  },
};
