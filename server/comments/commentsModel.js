const knex = require('../database/schema.knex.js');

module.exports = {
  comments: {
    getComments(params, callback) {
      return knex('comments').where('id_event', params)
        .then((comments) => {
          const nameIds = comments.map((comments) => comment.id_user);
          return knex.select('id', 'fullname', 'profile_photo').from('users').whereIn('id', nameIds)
            .then((posterInfo) => {
              const obj = {
                comments,
                posterInfo,
              };
              return obj;
            });
        });
      // const queryStr = 'SELECT * FROM comments WHERE id_event = ?';
      // db.query(queryStr, params, (err, comments) => {
      //   if (err) {
      //     console.log('Error in server/commentsModel.js getComments : ', err);
      //   } else {
      //     console.log('RESULTS IN GET COMMENTS: ', comments);
      //     const nameIds = comments.map((comment) => comment.id_user).join(', ');
      //     const queryStr2 = `SELECT id, fullname, profile_photo FROM users WHERE id IN (${nameIds})`;
      //     db.query(queryStr2, (error, posterInfo) => {
      //       if (error) {
      //         console.log('Error in server/eventModel.js getFriendsEvents : ', err);
      //       } else {
      //         callback({ comments, posterInfo });
      //       }
      //     });
      //   }
      // });
    },
    removeComment(params) {
      return knex('comments').where('id', params).del();
      // const queryStr = 'DELETE FROM comments WHERE id = ?'
      // db.query(queryStr, params, (err, results) => {
      //   if (err) {
      //     console.log('Error in server/commentsModel.js removeComment : ', err);
      //   } else {
      //   callback(results);
      //   }
      // });
    },
    addComment(params, callback) {
      return knex('comments').insert({id_user: params[0], id_friend: params[1], id_event: params[2], text: params[3]})
        .then((response) => {
          return knex('users').where({id: params[0]}).select('id', 'fullname', 'profile_photo')
            .then((posterInfo) => {
              const response = {
                posterInfo,
                commentId: response.insertId,
              }
              return response;
            });
        });
      // let commentId;
      // const queryStr = 'INSERT INTO comments (id_user, id_friend, id_event, text) VALUES (?, ?, ?, ?)'
      // db.query(queryStr, params, (err, results) => {
      //   if(err) {
      //     console.log('Error in server/commentsModel.js addComment : ', err);
      //   }
      //   else{
      //     console.log('COMMENT RESULTS: ', results);
      //     commentId = results.insertId;
      //   }
      // });
      // const findUserNameQuery = `SELECT id, fullname, profile_photo FROM users WHERE id IN (${params[0]})`
      // console.log('PARAMS IN ADD COMMENT: ', params);
      // db.query(findUserNameQuery, (error, posterInfo) => {
      //   if(error) {
      //     console.log('Error in finding username of add comment');
      //   } else {
      //     console.log('POSTER INFO IN ADD COMMENT: ', posterInfo);
      //     let response = {
      //       posterInfo,
      //       commentId,
      //     }
      //     callback(response);
      //   }
      // });
    },
  },
};
