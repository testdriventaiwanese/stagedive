const userModel = require('./userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  users: {
    signin({ body: { username, password } }, res) {
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

    signup({ body: { email, password, fullname } }, res) {
      bcrypt.hash(password, null, null, ((err, hash) => {
        const params = [email, hash, fullname];
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
  },
};



// module.exports = {
//   users: {
//     signin({ body: { email, password } }, res) {
//       userModel.users.getPassword(email, (results) => {
//         if (results.length === 0) {
//           console.log('ERROR no password found');
//           res.sendStatus(401);
//         } else {
//           bcrypt.compare(password, results[0].password, ((err, response) => {
//             if (!response) {
//               console.log('Password did not match in compare');
//               res.sendStatus(401);
//             } else {
//               const token = jwt.encode(email, 'secret');
//               res.json({ token });
//             }
//           }));
//         }
//       });
//     },
//
//     signup({ body: { email, pw, name } }, res) {
//       bcrypt.hash(pw, null, null, ((err, password) => {
//         const params = { email, password, name };
//         userModel.users.addOne(params, (response) => {
//           if (!response) {
//             console.log('Issue in adding to database');
//             res.sendStatus(401);
//           } else {
//             const token = jwt.encode(email, 'secret');
//             res.json({ token });
//           }
//         });
//       }));
//     },
//
//     addFollower({ body: { user1, user2 } }, res) {
//       const params = { user1, user2 };
//       userModel.users.addFollower(params, (response) => {
//         if (!response) {
//           console.log('Issue in adding follower');
//           res.sendStatus(500);
//         } else {
//           const token = jwt.encode(email, 'secret');
//           res.json({ token });
//         }
//       });
//     },
//
//     unfollow({ body: { user1, user2 } }, res) {
//       const params = { user1, user2 };
//       userModel.users.unfollow(params, (response) => {
//         if (!response) {
//           console.log('Issue in adding follower');
//           res.sendStatus(500);
//         } else {
//           const token = jwt.encode(email, 'secret');
//           res.json({ token });
//         }
//       });
//     },
//   },
// };
