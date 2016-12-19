const db = require('../database/config');

module.exports = {
  users: {
    addOne(params, callback) {
      const session = db.session();
      const statement = 'CREATE (n:User {email:email, password:password, name:name }) RETURN n';

      session.run(statement, params)
        .then((records) => {
          console.log('ADD ONE RECORDS: ', records);
          // callback(records);
          const summary = session.summarize();
          // Print number of nodes created
          console.log('POST ADD SUMMARY : ', summary.updateStatistics.nodesCreated());
        })
        .catch((err) => {
          console.log('ERROR after adding user: ', err);
        })
        .then(() => session.close());
    },

    getPassword(params, callback) {
      const session = db.session();
      const statement = 'MATCH (n:User) WHERE n.email = email RETURN n.password';

      session.run(statement, params)
        .then((records) => {
          console.log('GET PASSWORD RECORD: ', records);
          // callback(records);
        })
        .catch((err) => {
          console.log('ERROR after adding user: ', err);
        })
        .then(() => session.close());
    },

    addFollower(params, callback) {
      const session = db.session();
      const statement = 'MATCH (n:User {name:user1}), (m:User {name:user2}) MERGE (n)-[:FOLLOWS]-(m) RETURN n,m';

      session.run(statement, params)
        .then((record) => {
          console.log('FOLLOWER RECORD: ', record);
        })
        .catch((err) => {
          console.log('ERROR With follow: ', err);
        })
        .then(() => session.close());
    },

    
  },
};
