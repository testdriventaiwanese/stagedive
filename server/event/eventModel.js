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
    addEvent(params, callback) {
      const queryStr = 'INSERT INTO events (tm_id, name, artist_name, date, event_url, venue, venue_address, city, zipcode, image, genre, subgenre, latitude, longitude, couuntry, sale_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js addEvent : ', err);
        } else {
          callback(results);
        }
      });
    },
    userEvents(params, callback) {
      const queryStr = 'SELECT name FROM event WHERE id_users = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js userEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    searchEvents(params, callback) {
      const queryStr = 'SELECT name FROM event WHERE name = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js searchEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    relatedEvents(params, callback) {
      const queryStr = 'SELECT name FROM event WHERE genre = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js relatedEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    localEvents(params, callback) {
      const queryStr = 'SELECT name FROM event WHERE city = ? OR zipcode = ? OR location = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js localEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
    removeEvents(params, callback) {
      const queryStr = 'DELETE FROM event WHERE name = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js removeEvents : ', err);
        } else {
          callback(results);
        }
      });
    },
  },
};
