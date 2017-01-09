const commentsModel = require('./commentsModel');
const jwt = require('jsonwebtoken');

module.exports = {
  comments: {
    getComments({ headers: {
      eventid,
      userid,
    } } , res) {
      // const id = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      const params = [eventid, userid]
      console.log('PARAMS GOT IN GET COMMENTS: ', params);
      commentsModel.comments.getComments(params, (results) => {
        if(!results) {
          console.log('ERROR in getting comments');
          res.sendStatus(401);
        } else {
          console.log('results in get comments: ', results);
          res.status(200).send(results);
        }
      });
    },
    addComment({ body: {
      id_event,
      userId,
      friendId,
      text,
    }, headers }, res) {
      const id = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      const params = [
        id.sub,
        friendId,
        id_event,
        text,
      ];
      console.log('PARAMS IN COMMENTSCONTROLLER GOT: ', params);
      commentsModel.comments.addComment(params, (results) => {
        if(!results) {
          console.log('ERROR in getting comments');
          res.sendStatus(401);
        } else {
          console.log('RESULTS IN ADD COMMENT USERNAME: ', results);
          let createdOn = new Date();
          let id_friend = friendId;
          let id_user = userId;

          const comment = {
            createdOn,
            id: results.commentId,
            id_event,
            id_friend,
            id_user,
            text,
          }

          const posterInfo = {
            fullname: results.posterInfo[0].fullname,
            id: results.posterInfo[0].id,
            profile_photo: results.posterInfo[0].profile_photo,
          }
          res.status(200).send({comment, posterInfo});
        }
      })
    },
    removeComment(req, res) {
      // const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      console.log('req.body.commentId in back:', req.body.commentId);
      const params = [req.body.commentId];
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
