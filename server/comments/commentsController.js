const commentsModel = require('./commentsModel');
const jwt = require('jsonwebtoken');

module.exports = {
  comments: {
    getComments(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      const params = [req.body.eventId, id.sub]
      commentsModel.comments.getComments(params, (results) => {
        if(!results) {
          console.log('ERROR in getting comments');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      }
    },
    addComment({ body: {
      id_events,
      friendId,
      text,
    }, headers }, res) {
      const id = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      const params = [
        id.sub,
        friendId,
        id_events,
        text,
      ];
      commentsModel.comments.addComment(params, (results) => {
        if(!results) {
          console.log('ERROR in getting comments');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      }
    },
    removeComment(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      const params = [req.body.text, id.sub];
      commentsModel.comments.removeComment(params, (results) => {
        if(!results) {
          console.log('ERROR in getting comments');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      }
    },
  },
};
