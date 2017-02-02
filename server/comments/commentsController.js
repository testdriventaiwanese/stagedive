const commentsModel = require('./commentsModel');
const jwt = require('jsonwebtoken');

// for getComments, destructure request body and pull out eventid, userid
exports.getComments = ({ headers: {
  eventid,
  userid,
} }, res) => {
  const params = [eventid, userid];
  commentsModel.getComments(params)
  .then((results) => {
    res.status(200).send(results);
  });
};

// for addComment, destructure request body and pull out id_event, userId, friendId, and text
exports.addComment = ({ body: {
  id_event,
  userId,
  friendId,
  text,
}, headers }, res) => {
  // decode authheader for current signed in userId
  const id = jwt.decode(headers.authheader, process.env.JWT_SECRET);
  const params = [
    id.sub,
    friendId,
    id_event,
    text,
  ];
  commentsModel.addComment(params)
  .then((results) => {
    let createdOn = new Date();
    const id_friend = friendId;
    const id_user = userId;
    // send back comment object with the following parameters:
    // createdOn (create a new date)
    // id, pull from results.commentId
    // id_event, id_friend, text
    const comment = {
      createdOn,
      id: results.commentId,
      id_event,
      id_friend,
      id_user,
      text,
    };
    // create posterInfo object containing the following from query results:
    // fullname, id, profile_photo
    const posterInfo = {
      fullname: results.posterInfo[0].fullname,
      id: results.posterInfo[0].id,
      profile_photo: results.posterInfo[0].profile_photo,
    };
    // send up object with comment and posterInfo
    res.status(200).send({ comment, posterInfo });
  });
};


exports.removeComment = (req, res) => {
  const params = [req.body.commentId];
  commentsModel.removeComment(params)
  .then((results) => {
    res.status(200).send(results);
  });
};
