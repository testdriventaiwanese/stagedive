const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); //
const router = require('./routes.js');
const app = express();

// requirements for Hapi JS
// const Hapi = require('hapi');
// const Inert = require('inert');
// const Good = require('good');
// const weeklyReminder = require('./email/emailHelper.js');  // uncomment for weekly reminder emails

module.exports = app;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(router);
app.use(express.static(path.join(__dirname, '/../client/')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.log('Error occurred : ', err);
  }
    // UNCOMMENT FOR WEEKLY REMINDER EMAILS
    // var reminded = false;
    // while(!reminded){
    //   console.log('Starting weekly reminder function');
    //   weeklyReminder(); // function lives in emailHelper.js
    //   reminded = true;
    // }
    console.log('Server is listening to port : ', port);
  }
});



// UNCOMMENT FOR HAPI JS SERVER CODE
// const server = new Hapi.Server();
// server.connection({ port });
//
// const plugins = [
//   { register: require('./routes/users.js') },
//   // { register: require('./routes/events.js') },
// ];
//
// server.route({
//   method: 'GET',
//   path: '/',
//   handler: (request, reply) => {
//     reply('Hello, world!');
//   },
// });
//
//
// server.register(plugins, (err) => {
//   if (err) { throw err; }
//
//   server.start(() => {
//     console.log('Server running at: ' + server.info.uri);
//   });
// });
