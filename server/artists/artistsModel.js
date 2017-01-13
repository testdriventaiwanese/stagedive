const knex = require('../database/schema.knex.js');

module.exports = {
  artists: {
    getUserArtists(params) {
      return knex.raw('SELECT * FROM artists INNER JOIN users_artists ON (users_artists.id_users = ? and artists.id=users_artists.id_artists)', params)
        .then((response) => {
          console.log('response from getUserArtists: ', response);
          return response[0];
        });

      // const queryStr = 'SELECT * FROM artists INNER JOIN users_artists ON (users_artists.id_users = ? and artists.id=users_artists.id_artists)';
      // db.query(queryStr, params, (err, results) => {
      //   if (err) {
      //     console.log('Error in server/artistsModel.js getUserArtists : ', err);
      //   } else {
      //     callback(results);
      //   }
      // });
    },
    addArtist(userId, params) {
      return knex('artists').where({ mbid: params.mbid }).select('id')
        .then((res) => {
          if (res.length !== 0) {
            return knex('users_artists').insert({ id_users: userId, id_artists: res[0].id });
          } else {
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
              console.log('artist add in knex model: ', artistAddRes);
              return knex('users_artists').insert({ id_users: userId, id_artists: artistAddRes[0] });
            })
          }
        })
      // const queryStr = 'SELECT id FROM artists WHERE mbid = ?';
      // const queryStr2 = 'INSERT INTO artists (mbid, name, image, events, facebook, onTourUntil, upcoming_events) VALUES (?, ?, ?, ?, ?, ?, ?)';
      // const queryStr3 = 'INSERT INTO users_artists (id_users, id_artists) VALUES (?, ?)';
      // db.query(queryStr, params[0], (err, artistResults) => {
      //   if (err) {
      //     console.log('Error in server/artistsModel.js addArtist : ', err);
      //   } else {
      //     if (artistResults.length !== 0) {
      //       const dupeParams = [userId, artistResults[0].id];
      //       db.query(queryStr3, dupeParams, (userArtistsErr, userArtistsResults) => {
      //         if (userArtistsErr) {
      //           console.log('Error in server/artistsModel.js addArtist userArtistErr : ', userArtistsErr);
      //         } else {
      //           callback(userArtistsResults);
      //         }
      //       });
      //     } else {
      //       db.query(queryStr2, params, (insertErr, insertResults) => {
      //         if (insertErr) {
      //           console.log('Error in server/artistsModel.js addArtist insertErr : ', insertErr);
      //         } else {
      //           const params2 = [userId, insertResults.insertId];
      //           db.query(queryStr3, params2, (userArtistsErr, userArtistsResults) => {
      //             if (userArtistsErr) {
      //               console.log('Error in server/artistsModel.js userArtistErr2 : ', userArtistsErr);
      //             } else {
      //               callback(userArtistsResults);
      //             }
      //           });
      //         }
      //       });
      //     }
      //   }
      // });
    },
    deleteArtist(params) {
      return knex.select('id').from('artists').where({ mbid: params.mbid })
         .then((artistResults) => {
          return knex.select('id_users').from('users_artists').where({ id_artists: artistResults[0].id })
            .then((userArtistsResp) => {
              if (userArtistsResp.length > 1) {
                return knex('users_artists').where('id_artists', artistResults[0].id).andWhere('id_users', params.userId).del()
              } else {
                return knex('users_artists').where('id_artists', artistResults[0].id).andWhere('id_users', params.userId).del()
                  .then((deleteUserArtist) => {
                    return knex('artists').where('id', artistResults[0].id).del()
                  })
              }
            })
         });
    },
  },
};
