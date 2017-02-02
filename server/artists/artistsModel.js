const knex = require('../database/schema.knex.js');

exports.getUserArtists = (params) => {
  return knex.raw('SELECT * FROM artists INNER JOIN users_artists ON (users_artists.id_users = ? and artists.id=users_artists.id_artists)', params)
  .then(response => response[0]);
};


exports.addArtist = (userId, params) => {
  return knex('artists').where({ mbid: params.mbid }).select('id')
  .then((res) => {
    if (res.length !== 0) {
      return knex('users_artists').insert({ id_users: userId, id_artists: res[0].id });
    }
    return knex('artists').insert({
      mbid: params.mbid,
      name: params.name,
      image: params.image,
      events: params.events,
      facebook: params.facebook,
      onTourUntil: params.onTourUntil,
      upcoming_events: params.upcoming_events,
    })
    .then((artistAddRes) => {
      return knex('users_artists').insert({ id_users: userId, id_artists: artistAddRes[0] });
    });
  })
};


exports.deleteArtist = (params) => {
  return knex.select('id').from('artists').where({ mbid: params.mbid })
  .then((artistResults) => {
    return knex.select('id_users').from('users_artists').where({ id_artists: artistResults[0].id })
    .then((userArtistsResp) => {
      if (userArtistsResp.length > 1) {
        return knex('users_artists').where('id_artists', artistResults[0].id).andWhere('id_users', params.userId).del()
      }
      return knex('users_artists').where('id_artists', artistResults[0].id).andWhere('id_users', params.userId).del()
      .then((deleteArtistResult) => {
        return knex('artists').where('id', artistResults[0].id).del()
      });
    });
  });
};
