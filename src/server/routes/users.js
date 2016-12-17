const userModel = require('../user/userController');

// Options can be passed to plugins on registration
exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/api/user',
      handler: (request, reply) => {
        reply('make this work!');
      },
    },
    {
      method: 'POST',
      path: '/api/user',
      handler: (request, reply) => {
        reply('make this work');
      },
    },
  ]);
    // Callback, completes the registration process
  next();
};
// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
  name: 'users-route',
};
