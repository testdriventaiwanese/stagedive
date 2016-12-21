const db = require('../database/config');

module.exports = {
  events: {
    getall(callback) {
      // const queryStr = 'SELECT *, user_events.id_events FROM events INNER JOIN users_events ON users_events.id_users = ? ';
      const queryStr = 'SELECT * FROM events';
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js getAll : ', err);
        } else {
          callback(results);
        }
      });
    },
    addEvent(userId, params, callback) {
      const queryStr = 'INSERT INTO events (tm_id, name, artist_name, date, event_url, venue, venue_address, city, zipcode, image, genre, subgenre, latitude, longitude, country, sale_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      // const queryStr2 = 'INSERT INTO users_events (id_users, id_events) VALUES (?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js addEvent : ', err);
        } else {
          console.log('ADD EVENT QUERY 1 RESPONSE: ', results);
          const params2 = [userId, results.insertId];
          callback(results);
          // db.query(queryStr2, params2, (err, results) => {
          //   if (err) {
          //     console.log('Error in server/eventModel.js addEvent : ', err);
          //   } else {
          //     callback(results);
          //   }
          // });
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
      const queryStr = 'DELETE FROM users_events WHERE id_events = ? AND id_users = ?';
      const queryStr2 = 'DELETE FROM events WHERE id = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js removeEvents : ', err);
        } else {
          console.log('AFTER DELETE EVENT RESULTS: ', results);
          db.query(queryStr2, params[0], (err, results) => {
            if (err) {
              console.log('Error in server/eventModel.js removeEvents : ', err);
            } else {
              callback(results);
            }
          });
        }
      });
    },
  },
};
