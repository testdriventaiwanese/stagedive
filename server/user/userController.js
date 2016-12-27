const userModel = require('./userModel');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');


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
    getInfo(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      userModel.users.findById(id.sub, (response) => {
        if (!response) {
          console.log('Issue retreiving users from database');
          res.sendStatus(401);
        } else {
          res.json(response);
        }
      });
    },
    changepassword({ body: { email, prevPassword, newPassword } }, res) {
      userModel.users.getPassword(email, (response) => {
        bcrypt.compare(prevPassword, response[0].password, (passwordErr, isMatch) => {
          if (!isMatch) {
            console.log('Password did not match', passwordErr);
            res.sendStatus(401);
          } else {
            bcrypt.hash(newPassword, null, null, ((err, hash) => {
              const params = [hash, email];
              userModel.users.changePassword(params, (resp) => {
                if (!resp) {
                  console.log('Issue in changing password in database');
                  res.sendStatus(401);
                } else {
                  res.status(200).send('Password Change Successful!');
                }
              });
            }));
          }
        });
      });
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
    deleteUser({ body: { email, password } }, res) {
      userModel.users.getPassword(email, (resp) => {
        bcrypt.compare(password, resp[0].password, (passwordErr, isMatch) => {
          if (!isMatch) {
            console.log('Wrong password for delete user: ', passwordErr);
            res.sendStatus(401);
          } else {
            userModel.users.deleteUser(email, (response) => {
              if (!response) {
                console.log('Issue in adding to database');
                res.sendStatus(401);
              } else {
                console.log('Success deleting account!!!');
                res.sendStatus(200);
              }
            });
          }
        });
      });
    },
  },
};
