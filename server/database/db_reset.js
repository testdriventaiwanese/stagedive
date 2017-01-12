const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysqlcluster4.registeredsite.com',
  user: 'tdtadmin',
  password: '!Qaz2wsx3edc',
  database: 'concert_wallet',
});

connection.connect();
connection.end();

// module.exports = connection;
