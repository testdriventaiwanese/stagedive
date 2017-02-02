const knex = require('../database/schema.knex.js');


exports.findById = (params) => {
  return knex('users')
  .where({ id: params })
  .select('id', 'email', 'fullname', 'createdOn', 'profile_photo');
};


exports.findOne = (params) => {
  return knex('users')
  .where({ email: params })
  .select('email');
};


exports.findUser = (params) => {
  return knex.raw('SELECT id, email, fullname FROM users WHERE fullname LIKE CONCAT("%", ? , "%")', params)
  .then(response => response[0]);
};


exports.addOne = (params) => {
  return knex('users')
  .insert({ email: params[0], password: params[1], fullname: params[2], profile_photo: params[3] })
  .then(res => res);
};


exports.getPassword = (params) => {
  return knex('users')
  .where({ email: params })
  .select('id', 'password', 'fullname');
};


exports.getAll = (params) => {
  return knex.select('id', 'email', 'fullname')
  .from('users');
};


exports.getFriends = (params) => {
  return knex.raw('SELECT users.id, users.email, users.fullname, users.profile_photo, users_friends.createdOn FROM users INNER JOIN users_friends ON (users_friends.id_user = ? AND users.id = users_friends.id_friend)', params)
  .then(response => response[0]);
};


exports.addFollow = (params) => {
  return knex('users_friends')
  .where({ id_user: params.id_user, id_friend: params.id_friend })
  .then(() => {
    return knex('users_friends').insert({ id_user: params.id_user, id_friend: params.id_friend });
  });
};


exports.unfollow = (params) => {
  return knex('users_friends')
  .where({ id_user: params.id_user, id_friend: params.id_friend })
  .del();
};
