const db = require('../database/config');

module.exports = {
  users: {
    addOne(params, callback) {
      const queryStr = 'INSERT INTO users (email, password, fullname) VALUES (?, ?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js addOne : ', err);
        } else {
          callback(results);
        }
      });
    },

    getPassword(params, callback) {
      const queryStr = 'SELECT password FROM users WHERE email = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js getPassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    changePassword(params, callback) {
      const queryStr = 'UPDATE users SET password = ? WHERE email = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js changePassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    addFollow(params, callback) {
      const queryStr = 'INSERT into users_friends';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js addFollow : ', err);
        } else {
          callback(results);
        }
      });
    },

    unfollow(params, callback) {
      const queryStr = '';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js unfollow : ', err);
        } else {
          callback(results);
        }
      });
    },
  },
};


// UNCOMMENT FOR GRAPH DATABASE CALLS
// module.exports = {
//   users: {
//     addOne(params, callback) {
//       const session = db.session();
//       const statement = 'CREATE (n:User {email:email, password:password, name:name }) RETURN n';
//
//       session.run(statement, params)
//         .then((records) => {
//           console.log('ADD ONE RECORDS: ', records);
//           // callback(records);
//           const summary = session.summarize();
//           // Print number of nodes created
//           console.log('POST ADD SUMMARY : ', summary.updateStatistics.nodesCreated());
//         })
//         .catch((err) => {
//           console.log('ERROR after adding user: ', err);
//         })
//         .then(() => session.close());
//     },
//
//     getPassword(params, callback) {
//       const session = db.session();
//       const statement = 'MATCH (n:User) WHERE n.email = email RETURN n.password';
//
//       session.run(statement, params)
//         .then((records) => {
//           console.log('GET PASSWORD RECORD: ', records);
//           // callback(records);
//         })
//         .catch((err) => {
//           console.log('ERROR after adding user: ', err);
//         })
//         .then(() => session.close());
//     },
//
//     addFollower(params, callback) {
//       const session = db.session();
//       const statement = 'MATCH (n:User {name:user1}), (m:User {name:user2}) MERGE (n)-[:FOLLOWS]-(m) RETURN n,m';
//
//       session.run(statement, params)
//         .then((record) => {
//           console.log('FOLLOWER RECORD: ', record);
//         })
//         .catch((err) => {
//           console.log('ERROR With follow: ', err);
//         })
//         .then(() => session.close());
//     },
//
//     unfollow(params, callback) {
//       const session = db.session();
//       // const statement = 'MATCH (n:User {name:user1}), (m:User {name:user2}) MERGE (n)-[:FOLLOWS]-(m) RETURN n,m';
//
//       session.run(statement, params)
//         .then((record) => {
//           console.log('UNFOLLOW RECORD: ', record);
//         })
//         .catch((err) => {
//           console.log('ERROR With unfollow: ', err);
//         })
//         .then(() => session.close());
//     },
//
//
//   },
// };
