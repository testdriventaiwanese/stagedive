const db = require('../database/config');

module.exports = {
  events: {
    newEvents(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
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
      //save query string in separate var to pass into database query, question marks denote params being passed in
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
      //save query string in separate var to pass into database query, question marks denote params being passed in
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
      //save query string in separate var to pass into database query, question marks denote params being passed in
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
      //save query string in separate var to pass into database query, question marks denote params being passed in
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

      const queryStr = 'DELETE FROM event WHERE name = ?'
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/eventModel.js removeEvents : ', err);
        } else {
          callback(results);
        }
      })
    }
  } ,
};
