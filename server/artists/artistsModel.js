const knex = require('../database/schema.knex.js');

module.exports = {
  artists: {
    getUserArtists(params) {
      return knex.from('artists').innerJoin('users_artists', (qb1) => {
        qb1.where('users_artists.id_users', params).andWhere('artists.id', 'users_artists.id_artists');
      }

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
              return knex('users_artists').insert({ id_users: userId, id_artists: artistAddRes[0].insertId });
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
    deleteArtist(params, callback) {
      return knex('artists').where({ mbid: params[0] }).select('id')
         .then((artistResults) = > {
          return knex('users_artists').where({ id_artists: artistResults[0] }).select('id_users')
            .then((userArtistsResp) => {
              if (userArtistsResp.length > 1) {
                return knex('users_artists').where('id_artists', userArtistsResp[0].id).andWhere('id_users', params[1]).del()
              } else {
                return knex('users_artists').where('id_artists', userArtistsResp[0].id).andWhere('id_users', params[1]).del()
                  .then((deleteUserArtist) => {
                    return knex('artists').where('id', userArtistsRespp[0].id).del()
                  })
              }
            })
        });
      // const queryStr = 'SELECT id FROM artists WHERE mbid = ?';
      // const queryStr2 = 'SELECT id_users FROM users_artists WHERE id_artists = ?';
      // const queryStr3 = 'DELETE FROM users_artists WHERE id_artists = ? AND id_users = ?';
      // const queryStr4 = 'DELETE FROM artists WHERE id = ?';
      // db.query(queryStr, params[0], (eventErr, artistResults) => {
      //   if (eventErr) {
      //     console.log('Error in server/artistsModel.js deleteArtist : ', eventErr);
      //   } else {
      //     db.query(queryStr2, artistResults[0].id, (userArtistsErr, userArtistsResults) => {
      //       if (userArtistsErr) {
      //         console.log('Error in server/artistsModel.js deleteArtist : ', userArtistsErr);
      //       } else {
      //         if (userArtistsResults.length > 1) {
      //           const multipleArtistsParams = [artistResults[0].id, params[1]];
      //           db.query(queryStr3, multipleArtistsParams, (deleteUserArtist, deleteUserArtistResult) => {
      //             if (deleteUserArtist) {
      //               console.log('Error in server/artistsModel.js deleteArtist : ', deleteUserArtist);
      //             } else {
      //               callback(deleteUserArtistResult);
      //             }
      //           });
      //         } else {
      //           const singleEventParams = [artistResults[0].id, params[1]];
      //           db.query(queryStr3, singleEventParams, (deleteUserArtistErr, res) => {
      //             if (deleteUserArtistErr) {
      //               console.log('Error in server/artistsModel.js deleteArtist : ', deleteUserArtistErr);
      //             } else {
      //               db.query(queryStr4, artistResults[0].id, (deleteArtistErr, deleteArtistResult) => {
      //                 if (deleteArtistErr) {
      //                   console.log('Error in server/artistsModel.js deleteArtist : ', deleteArtistErr);
      //                 } else {
      //                   callback(deleteArtistResult);
      //                 }
      //               });
      //             }
      //           });
      //         }
      //       }
      //     });
      //   }
      // });
    },
  },
};
