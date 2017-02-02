const config = {
  host: 'mysqlcluster4.registeredsite.com',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'concert_wallet',
};

module.exports = config;

// connection pooling: uncomment if not using built in Knex pooling

// // const connection = mysql.createConnection(config);
//
// // module.exports = connection;
//
// const pool = mysql.createPool(config);
//
// // setInterval(() => {
// //   pool.query('SELECT 1');
// //   console.log('set interval happened');
// // }, 10000);
//
// module.exports = {
//   query: function() {
//     let sql_args = [];
//     const args = [];
//     for (var i = 0; i < arguments.length; i++) {
//       args.push(arguments[i]);
//     }
//     const callback = args[args.length - 1]; // last arg is callback
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.log(err);
//         return callback(err);
//       }
//       if (args.length > 2){
//         sql_args = args[1];
//       }
//       connection.query(args[0], sql_args, (newErr, results) => {
//         connection.release(); // always put connection back in pool after last query
//         if (newErr) {
//           console.log(err);
//           return callback(err);
//         }
//         callback(null, results);
//       });
//     });
//   },
// };
