const db = require('../database/config');

module.exports = {
  users: {
    addOne(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js addOne : ', err);
        } else {
          callback(results);
        }
      });
    },

    getPassword(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = 'SELECT password FROM users WHERE username = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js getPassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    changePassword(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = '';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js getPassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    addFollow(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = '';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js addFollow : ', err);
        } else {
          callback(results);
        }
      });
    },

    unfollow(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
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
