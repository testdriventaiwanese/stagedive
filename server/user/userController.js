const userModel = require('./userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  users: {
    getAll(req, res) {
      userModel.users.getAll((response) => {
        if (!response) {
          console.log('Issue retreiving users from database');
          res.sendStatus(401);
        } else {
          res.json(response);
        }
      });
    },
    changepassword({ body: { email, password } }, res) {
      bcrypt.hash(password, null, null, ((err, hash) => {
        const params = [hash, email];
        userModel.users.changePassword(params, (response) => {
          if (!response) {
            console.log('Issue in adding to database');
            res.sendStatus(401);
          } else {
            res.status(200).send('Password Change Successful!');
          }
        });
      }));
    },
    addfollow({ body: { user1, user2 } }, res) {
      const params = [user1, user2];
      userModel.users.addFollow(params, (response) => {
        if (!response) {
          console.log('Issue in adding to database');
          res.sendStatus(401);
        } else {
          res.sendStatus(200);
        }
      });
    },
    unfollow({ body: { user1, user2 } }, res) {
      const params = [user1, user2];
      userModel.users.unfollow(params, (response) => {
        if (!response) {
          console.log('Issue in adding to database');
          res.sendStatus(401);
        } else {
          res.sendStatus(200);
        }
      });
    },
    deleteUser({ body: { email } }, res) {
      userModel.users.deleteUser(email, (response) => {
        if (!response) {
          console.log('Issue in adding to database');
          res.sendStatus(401);
        } else {
          res.sendStatus(200);
        }
      });
    },
  },
};
