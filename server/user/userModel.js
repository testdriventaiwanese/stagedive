const knex = require('../database/schema.knex.js');

module.exports = {
  users: {
    findById(params) {
      return knex('users').where({ id: params })
        .select('id', 'email', 'fullname', 'createdOn', 'profile_photo');
    },
    findOne(params) {
      return knex('users').where({ email: params })
        .select('email');
    },
    findUser(params) {
      return knex.raw('SELECT id, email, fullname FROM users WHERE fullname LIKE CONCAT("%", ? , "%")', params)
        .then((response) => {
          return response[0];
        });
    },
    addOne(params) {
      return knex('users').insert({email: params[0], password: params[1], fullname: params[2], profile_photo: params[3]})
        .then((res) => {
          return res;
        });
    },
    getPassword(params) {
      return knex('users').where({ email: params })
        .select('id', 'password', 'fullname');
    },
    getAll(params) {
      return knex.select('id', 'email', 'fullname').from('users');
    },
    getFriends(params) {
      return knex.raw('SELECT users.id, users.email, users.fullname, users.profile_photo, users_friends.createdOn FROM users INNER JOIN users_friends ON (users_friends.id_user = ? AND users.id = users_friends.id_friend)', params)
        .then((response) => {
          return response[0];
        });
    },
    addFollow(params) {
      return knex('users_friends').where({id_user: params.id_user, id_friend: params.id_friend})
        .then((res) => {
          return knex('users_friends').insert({id_user: params.id_user, id_friend: params.id_friend})
        });
    },
    unfollow(params) {
      return knex('users_friends').where({id_user: params.id_user, id_friend: params.id_friend})
        .del()
        .then((res) => {
          console.log(res);
        });
    },
  },
};
