const mysql = require('mysql');

const config = {
  host: 'mysqlcluster4.registeredsite.com',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'concert_wallet',
};

// const connection = mysql.createConnection(config);

const pool = mysql.createPool(config);

setInterval(() => {
  pool.query('SELECT 1');
  console.log('set interval happened');
}, 10000);

module.exports = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
        if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, results);
        });
      });
    }
};
