const db = require('../database/config');

const findUserNameWithId = function(query, callback) {
  db.query(query, userID, function(err, results) {
    if(err) {
      console.log('Error in finding username in room');
    }
    else {
      callback(results);
    }
  })
}

module.exports = {
  comments: {
    getComments(params, callback) {
      const queryStr = 'SELECT * FROM comments WHERE id_event = ?';
      db.query(queryStr, params, (err, comments) => {
        if (err) {
          console.log('Error in server/commentsModel.js getComments : ', err);
        } else {
          console.log('RESULTS IN GET COMMENTS: ', comments);
          const nameIds = comments.map((comment) => comment.id_user).join(', ');
          const queryStr2 = `SELECT id, fullname, profile_photo FROM users WHERE id IN (${nameIds})`;
          db.query(queryStr2, (error, posterInfo) => {
            if (error) {
              console.log('Error in server/eventModel.js getFriendsEvents : ', err);
            } else {
              callback({ comments, posterInfo });
            }
          });
        }
      });
    },
    removeComment(params, callback) {
      const queryStr = 'DELETE FROM comments WHERE id = ?'
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/commentsModel.js removeComment : ', err);
        } else {
        callback(results);
        }
      });
    },
    addComment(params, callback) {
      let commentId;
      const queryStr = 'INSERT INTO comments (id_user, id_friend, id_event, text) VALUES (?, ?, ?, ?)'
      db.query(queryStr, params, (err, results) => {
        if(err) {
          console.log('Error in server/commentsModel.js addComment : ', err);
        }
        else{
          console.log('COMMENT RESULTS: ', results);
          commentId = results.insertId;
        }
      });
      const findUserNameQuery = `SELECT id, fullname, profile_photo FROM users WHERE id IN (${params[0]})`
      console.log('PARAMS IN ADD COMMENT: ', params);
      db.query(findUserNameQuery, (error, posterInfo) => {
        if(error) {
          console.log('Error in finding username of add comment');
        } else {
          console.log('POSTER INFO IN ADD COMMENT: ', posterInfo);
          let response = {
            posterInfo,
            commentId,
          }
          callback(response);
        }
      });
    },
  },
};
