const userModel = require('./userModel');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');


module.exports = {
  users: {
    getAll(req, res) {
      userModel.users.getAll(req.body)
        .then((response) => {
          res.status(200).send(response);
        });
      //   (response) => {
      //   if (!response) {
      //     console.log('Issue retreiving users from database');
      //     res.sendStatus(401);
      //   } else {
      //     res.json(response);
      //   }
      // });
    },
    getInfo(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      userModel.users.findById(id.sub)
        .then((response) => {
          res.status(200).send(response);
        });
      // , (response) => {
      //   if (!response) {
      //     console.log('Issue retreiving users from database');
      //     res.sendStatus(401);
      //   } else {
      //     res.json(response);
      //   }
      // });
    },
    getOtherInfo(req, res) {
      console.log('get other info id: ', req.headers.userid);
      userModel.users.findById(req.headers.userid)
        .then((response) => {
          res.status(200).send(response);
        })
      //   , (response) => {
      //   if (!response) {
      //     console.log('Issue retreiving users from database');
      //     res.sendStatus(401);
      //   } else {
      //     res.json(response);
      //   }
      // });
    },
    findUser({ body: { query } }, res) {
      userModel.users.findUser(query)
        .then((response) => {
          res.status(200).send(response);
        })
      //   , (response) => {
      //   if (!response) {
      //     console.log('Issue retreiving users from database');
      //     res.sendStatus(401);
      //   } else {
      //     res.json(response);
      //   }
      // });
    },
    changepassword({ body: { email, prevPassword, newPassword } }, res) {
      userModel.users.getPassword(email)
        .then((response) => {
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
        })
    },
    getFriends(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      userModel.users.getFriends(id.sub)
        .then((response) => {
          res.status(200).send(response)
        })
      //   , (response) => {
      //   if (!response) {
      //     console.log('Issue retreiving users from database');
      //     res.sendStatus(401);
      //   } else {
      //     res.json(response);
      //   }
      // });
    },
    getOtherFriends(req, res) {
      const id = req.headers.id;
      userModel.users.getFriends(id)
        .then((response) => {
          res.status(200).send(response);
        })
        //
    },
    addfollow(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      const params = {id_user: id.sub, id_friend: req.body.userId};
      userModel.users.addFollow(params)
        .then((response) => {
          res.status(200).send(response);
        })
      //   , (response) => {
      //   if (!response) {
      //     console.log('Issue in adding to database');
      //     res.sendStatus(401);
      //   } else {
      //     res.sendStatus(200);
      //   }
      // });
    },
    unfollow(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      const params = {id_user: id.sub, id_friend: req.body.userId}
      userModel.users.unfollow(params)
        .then((response) => {
          res.status(200).send(response);
        })
      // , (response) => {
      //   if (!response) {
      //     console.log('Issue in adding to database');
      //     res.sendStatus(401);
      //   } else {
      //     res.sendStatus(200);
      //   }
      // });
    },
  //   deleteUser({ body: { email, password } }, res) {
  //     userModel.users.getPassword(email, (resp) => {
  //       bcrypt.compare(password, resp[0].password, (passwordErr, isMatch) => {
  //         if (!isMatch) {
  //           console.log('Wrong password for delete user: ', passwordErr);
  //           res.sendStatus(401);
  //         } else {
  //           userModel.users.deleteUser(email, (response) => {
  //             if (!response) {
  //               console.log('Issue in adding to database');
  //               res.sendStatus(401);
  //             } else {
  //               console.log('Success deleting account!!!');
  //               res.sendStatus(200);
  //             }
  //           });
  //         }
  //       });
  //     });
  //   },
  },
};
