const knex = require('../database/schema.knex.js');


exports.getComments = (params) => {
  return knex('comments').where('id_event', params[0])
  .then((comments) => {
    // map comments and return an array containing the id_user parameter
    const nameIds = comments.map(comment => comment.id_user);
    return knex.select('id', 'fullname', 'profile_photo').from('users').whereIn('id', nameIds)
    .then((posterInfo) => {
      // send back object containing comments and posterInfo
      const obj = {
        comments,
        posterInfo,
      };
      return obj;
    });
  });
};


exports.addComment = (params) => {
  return knex('comments').insert({ id_user: params[0], id_friend: params[1], id_event: params[2], text: params[3] })
  .then((response) => {
    return knex('users').where({ id: params[0] }).select('id', 'fullname', 'profile_photo')
    .then((posterInfo) => {
      // send back response object containing commentId and posterInfo
      const respObj = {
        posterInfo,
        commentId: response[0],
      };
      return respObj;
    });
  });
};


exports.removeComment = (params) => {
  return knex('comments').where('id', params[0]).del();
};
