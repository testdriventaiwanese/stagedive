const db = require('../database/config');

module.exports = {
  events: {
    newEvents(params, callback) {
      const queryStr = 'INSERT INTO events (id_users, name, date, location, venue, city, zipcode, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js newEvents : ', err);
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
