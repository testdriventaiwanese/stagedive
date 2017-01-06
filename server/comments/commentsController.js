const commentsModel = require('./commentsModel');
const jwt = require('jsonwebtoken');

module.exports = {
  comments: {
    getComments({ body: {
      eventId,
      userId,
    }, headers }, res) {
      console.log('GET COMMENTS CALLED IN BACK');
      const id = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      const params = [eventId, id.sub]
      console.log('PARAMS GOT IN GET COMMENTS: ', params);
      commentsModel.comments.getComments(params, (results) => {
        if(!results) {
          console.log('ERROR in getting comments');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      });
    },
    addComment({ body: {
      id_events,
      userId,
      friendId,
      text,
    }, headers }, res) {
      console.log('ADD COMMENT CONTROLLER CALLED: ')
      const id = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      const params = [
        id.sub,
        friendId,
        id_events,
        text,
      ];
      console.log('PARAMS IN COMMENTSCONTROLLER GOT: ', params);
      commentsModel.comments.addComment(params, (results) => {
        if(!results) {
          console.log('ERROR in getting comments');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      })
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
      });
    },
  },
};
