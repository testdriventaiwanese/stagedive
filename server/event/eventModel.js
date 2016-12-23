const db = require('../database/config');

module.exports = {
  events: {
    getall(params, callback) {
      const queryStr = 'SELECT * FROM events INNER JOIN users_events ON (users_events.id_users = ? and events.id=users_events.id_events)'
      // const queryStr = 'SELECT * FROM events';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js getAll : ', err);
        } else {
          callback(results);
        }
      });
    },
    addEvent(userId, params, callback) {
      const queryStr = 'SELECT id FROM events WHERE tm_id = ?';
      const queryStr2 = 'INSERT INTO events (tm_id, name, artist_name, date, event_url, venue, venue_address, city, zipcode, image, genre, subgenre, latitude, longitude, country, sale_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const queryStr3 = 'INSERT INTO users_events (id_users, id_events) VALUES (?, ?)';
      db.query(queryStr, params[0], (err, eventResults) => {
        if (err) {
          console.log('Error in server/eventModel.js addEvent : ', err);
        } else {
          if (eventResults.length !== 0) {
            const dupeParams = [userId, eventResults[0].id];
            db.query(queryStr3, dupeParams, (userEventsErr, userEventsResults) => {
              if (userEventsErr) {
                console.log('Error in server/eventModel.js addEvent : ', err);
              } else {
                callback(userEventsResults);
              }
            });
          } else {
            db.query(queryStr2, params, (insertErr, insertResults) => {
              if (insertErr) {
                console.log('Error in server/eventModel.js addEvent : ', err);
              } else {
                const params2 = [userId, insertResults.insertId];
                db.query(queryStr3, params2, (userEventsErr, userEventsResults) => {
                  if (userEventsErr) {
                    console.log('Error in server/eventModel.js addEvent : ', err);
                  } else {
                    callback(userEventsResults);
                  }
                });
              }
            });
          }
        }
      });
    },
    userEvents(params, callback) {
      const queryStr = 'SELECT name FROM events WHERE id_users = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js userEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    searchEvents(params, callback) {
      const queryStr = 'SELECT name FROM events WHERE name = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js searchEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    relatedEvents(params, callback) {
      const queryStr = 'SELECT name FROM events WHERE genre = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js relatedEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    localEvents(params, callback) {
      const queryStr = 'SELECT name FROM events WHERE city = ? OR zipcode = ? OR location = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js localEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    deleteEvent(params, callback) {
      const queryStr = 'SELECT id FROM events WHERE tm_id = ?';
      const queryStr2 = 'SELECT id_users FROM users_events WHERE id_events = ?';
      const queryStr3 = 'DELETE FROM users_events WHERE id_events = ? AND id_users = ?';
      const queryStr4 = 'DELETE FROM events WHERE id = ?';
      db.query(queryStr, params[0], (eventErr, eventResults) => {
        if (eventErr) {
          console.log('Error in server/eventModel.js deleteEvent : ', eventErr);
        } else {
          db.query(queryStr2, eventResults[0].id, (userEventErr, userEventResults) => {
            if (userEventErr) {
              console.log('Error in server/eventModel.js deleteEvent : ', userEventErr);
            } else {
              if (userEventResults.length > 1) {
                const multipleEventsParams = [eventResults[0].id, params[1]];
                db.query(queryStr3, multipleEventsParams, (deleteUserEvent, deleteUserEventResult) => {
                  if (deleteUserEvent) {
                    console.log('Error in server/eventModel.js deleteEvent : ', deleteUserEvent);
                  } else {
                    callback(deleteUserEventResult);
                  }
                });
              } else {
                const singleEventParams = [eventResults[0].id, params[1]];
                db.query(queryStr3, singleEventParams, (deleteUserEventErr, res) => {
                  if (deleteUserEventErr) {
                    console.log('Error in server/eventModel.js deleteEvent : ', deleteUserEventErr);
                  } else {
                    db.query(queryStr4, eventResults[0].id, (deleteEventErr, deleteEventResult) => {
                      if (deleteEventErr) {
                        console.log('Error in server/eventModel.js deleteEvent : ', deleteEventErr);
                      } else {
                        callback(deleteEventResult);
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
