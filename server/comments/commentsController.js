const commentsModel = require('./commentsModel');
const jwt = require('jsonwebtoken');

module.exports = {
  comments: {
    getComments({ headers: {
      eventid,
      userid,
    } }, res) {
      const params = [eventid, userid];
      commentsModel.comments.getComments(params)
        .then((results) => {
          res.status(200).send(results);
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
      commentsModel.comments.addComment(params)
        .then((results) => {
          console.log('add comment results in controller: ', results);
          let createdOn = new Date();
          const id_friend = friendId;
          const id_user = userId;

          const comment = {
            createdOn,
            id: results.commentId,
            id_event,
            id_friend,
            id_user,
            text,
          };
          const posterInfo = {
            fullname: results.posterInfo[0].fullname,
            id: results.posterInfo[0].id,
            profile_photo: results.posterInfo[0].profile_photo,
          };
          res.status(200).send({ comment, posterInfo });
        })
    },
    removeComment(req, res) {
      const params = [req.body.commentId];
      commentsModel.comments.removeComment(params)
        .then((results) => {
          res.status(200).send(results);
        });
    },
  },
};
