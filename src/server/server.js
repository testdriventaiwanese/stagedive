const Hapi = require('hapi');
const Inert = require('inert');
const Good = require('good');
const Path = require('path');

const port = process.env.PORT || 5000;
const server = new Hapi.Server();

server.connection({ port });

const plugins = [
  // { register: require('./routes/users.js') },
  // { register: require('./routes/events.js') },
];

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('Hello, world!');
  },
});


server.register(plugins, (err) => {
  if (err) { throw err; }

  server.start(() => {
    console.log('Server running at: ' + server.info.uri);
  });
});
