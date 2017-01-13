const knex = require('../database/schema.knex.js');

module.exports = {
  comments: {
    getComments(params) {
      return knex('comments').where('id_event', params[0])
        .then((comments) => {
          const nameIds = comments.map((comment) => comment.id_user);
          return knex.select('id', 'fullname', 'profile_photo').from('users').whereIn('id', nameIds)
            .then((posterInfo) => {
              const obj = {
                comments,
                posterInfo,
              };
              return obj;
            });
        });
    },
    removeComment(params) {
      return knex('comments').where('id', params[0]).del();
    },
    addComment(params) {
      return knex('comments').insert({ id_user: params[0], id_friend: params[1], id_event: params[2], text: params[3] })
        .then((response) => {
          return knex('users').where({ id: params[0]} ).select('id', 'fullname', 'profile_photo')
            .then((posterInfo) => {
              const respObj = {
                posterInfo,
                commentId: response[0],
              }
              return respObj;
            });
        });
    },
  },
};
