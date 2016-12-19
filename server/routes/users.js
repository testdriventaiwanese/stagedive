// const userController = require('../user/userController');
//
// // Options can be passed to plugins on registration
// exports.register = (server, options, next) => {
//   server.route([
//     {
//       method: 'POST',
//       path: '/api/signin',
//       handler: (request, reply) => {
//         // userController.users.signin(request, reply);
//         console.log('Hello Your Post Works');
//       },
//     },
//     {
//       method: 'POST',
//       path: '/api/signup',
//       handler: (request, reply) => {
//         userController.users.signup(request, reply);
//       },
//     },
//   ]);
//     // Callback, completes the registration process
//   next();
// };
// // Required for all plugins
// // If this were a npm module, one could do this:
// // exports.register.attributes = require('package.json')
// exports.register.attributes = {
//   name: 'users-route',
// };
