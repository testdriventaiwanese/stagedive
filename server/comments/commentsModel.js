const db = require('../database/config');

module.exports = {
  comments: {
    getComments(params, callback) {
      const queryStr = 'SELECT * FROM comments WHERE id_event = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/commentsModel.js getComments : ', err);
        } else {
          callback(results);
        }
      });
    },
    removeComment(params, callback) {
      const queryStr = 'DELETE FROM comments WHERE id = ?'
      db.query(queryStr, params, (err, results) => {
        console.log('Error in server/commentsModel.js removeComment : ', err);
      } else {
        callback(results);
      }
    },
    addComment(params, callback) {
      const queryStr = 'INSERT INTO comments (id_user, id_friend, id_event, text) VALUES (?, ?, ?, ?)'
      db.query(queryStr, params, (err, results) => {
        console.log('Error in server/commentsModel.js addComment : ', err);
      } else {
        callback(results);
      }
    },
  },
};
