const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysqlcluster4.registeredsite.com',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'concert_wallet',
});

module.exports = connection.connect();
