const db = require('../database/config');

module.exports = {
  artists: {
    getUserArtists(params, callback) {
      const queryStr = 'SELECT * FROM artists INNER JOIN users_artists ON (users_artists.id_users = ? and artists.id=users_artists.id_artists)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/artistsModel.js getUserArtists : ', err);
        } else {
          callback(results);
        }
      });
    },
    searchArtists(params, callback) {
      const queryStr = 'SELECT name FROM artists WHERE name = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js searchEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    addArtist(userId, params, callback) {
      const queryStr = 'SELECT id FROM artists WHERE mbid = ?';
      const queryStr2 = 'INSERT INTO artists (mbid, name, image, events, facebook, onTourUntil, upcoming_events) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const queryStr3 = 'INSERT INTO users_artists (id_users, id_artists) VALUES (?, ?)';
      db.query(queryStr, params[0], (err, artistResults) => {
        if (err) {
          console.log('Error in server/artistsModel.js addArtist : ', err);
        } else {
          if (artistResults.length !== 0) {
            const dupeParams = [userId, artistResults[0].id];
            db.query(queryStr3, dupeParams, (userArtistsErr, userArtistsResults) => {
              if (userArtistsErr) {
                console.log('Error in server/artistsModel.js addArtist userArtistErr : ', userArtistsErr);
              } else {
                callback(userArtistsResults);
              }
            });
          } else {
            db.query(queryStr2, params, (insertErr, insertResults) => {
              if (insertErr) {
                console.log('Error in server/artistsModel.js addArtist insertErr : ', insertErr);
              } else {
                const params2 = [userId, insertResults.insertId];
                db.query(queryStr3, params2, (userArtistsErr, userArtistsResults) => {
                  if (userArtistsErr) {
                    console.log('Error in server/artistsModel.js userArtistErr2 : ', userArtistsErr);
                  } else {
                    callback(userArtistsResults);
                  }
                });
              }
            });
          }
        }
      });
    },
    userArtists(params, callback) {
      const queryStr = 'SELECT name FROM artists WHERE id_users = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/artistsModel.js userArtists : ', err);
        } else {
          callback(results);
        }
      });
    },
    deleteArtist(params, callback) {
      console.log('DELETE ARTIST PARAMS:: ', params)
      const queryStr = 'SELECT id FROM artists WHERE mbid = ?';
      const queryStr2 = 'SELECT id_users FROM users_artists WHERE id_artists = ?';
      const queryStr3 = 'DELETE FROM users_artists WHERE id_artists = ? AND id_users = ?';
      const queryStr4 = 'DELETE FROM artists WHERE id = ?';
      db.query(queryStr, params[0], (eventErr, artistResults) => {
        if (eventErr) {
          console.log('Error in server/artistsModel.js deleteArtist : ', eventErr);
        } else {
          db.query(queryStr2, artistResults[0].id, (userArtistsErr, userArtistsResults) => {
            if (userArtistsErr) {
              console.log('Error in server/artistsModel.js deleteArtist : ', userArtistsErr);
            } else {
              if (userArtistsResults.length > 1) {
                const multipleArtistsParams = [artistResults[0].id, params[1]];
                db.query(queryStr3, multipleArtistsParams, (deleteUserArtist, deleteUserArtistResult) => {
                  if (deleteUserArtist) {
                    console.log('Error in server/artistsModel.js deleteArtist : ', deleteUserArtist);
                  } else {
                    callback(deleteUserArtistResult);
                  }
                });
              } else {
                const singleEventParams = [artistResults[0].id, params[1]];
                db.query(queryStr3, singleEventParams, (deleteUserArtistErr, res) => {
                  if (deleteUserArtistErr) {
                    console.log('Error in server/artistsModel.js deleteArtist : ', deleteUserArtistErr);
                  } else {
                    db.query(queryStr4, artistResults[0].id, (deleteArtistErr, deleteArtistResult) => {
                      if (deleteArtistErr) {
                        console.log('Error in server/artistsModel.js deleteArtist : ', deleteArtistErr);
                      } else {
                        callback(deleteArtistResult);
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    },
  },
};
