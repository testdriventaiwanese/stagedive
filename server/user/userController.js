const userModel = require('./userModel');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');


exports.getAll = (req, res) => {
  userModel.getAll(req.body)
  .then((response) => {
    res.status(200).send(response);
  });
};


exports.getInfo = (req, res) => {
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  userModel.findById(id.sub)
  .then((response) => {
    res.status(200).send(response);
  });
};


exports.getOtherInfo = (req, res) => {
  userModel.findById(req.headers.userid)
  .then((response) => {
    res.status(200).send(response);
  });
};


exports.findUser = ({ body: { query } }, res) => {
  userModel.findUser(query)
  .then((response) => {
    res.status(200).send(response);
  });
};


exports.changepassword = ({ body: { email, prevPassword, newPassword } }, res) => {
  userModel.getPassword(email)
  .then((response) => {
    bcrypt.compare(prevPassword, response[0].password, (passwordErr, isMatch) => {
      if (!isMatch) {
        console.log('Password did not match', passwordErr);
        res.sendStatus(401);
      } else {
        bcrypt.hash(newPassword, null, null, ((err, hash) => {
          const params = [hash, email];
          userModel.changePassword(params, (resp) => {
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
};


exports.getFriends = (req, res) => {
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  userModel.getFriends(id.sub)
  .then((response) => {
    res.status(200).send(response);
  });
};


exports.getOtherFriends = (req, res) => {
  const id = req.headers.id;
  userModel.getFriends(id)
  .then((response) => {
    res.status(200).send(response);
  });
};


exports.addfollow = (req, res) => {
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  const params = { id_user: id.sub, id_friend: req.body.userId };
  userModel.addFollow(params)
  .then((response) => {
    res.status(200).send(response);
  });
};


exports.unfollow = (req, res) => {
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  const params = { id_user: id.sub, id_friend: req.body.userId };
  userModel.unfollow(params)
  .then((response) => {
    res.status(200).send(response);
  });
};
