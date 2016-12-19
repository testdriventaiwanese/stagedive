const router = require('express').Router();
const userController = require('./user/userController');
const eventController = require('./event/eventController');
// const email = require('./email/emailModel.js');

router.post('/api/users/signup', userController.users.signup);
router.post('/api/users/signin', userController.users.signin);
router.post('/api/users/addfollow', userController.users.addfollow);
router.post('/api/users/unfollow', userController.users.unfollow);

// Event routes here:


// see emailModel.js
// router.post('/api/newAppEmail', email.newSend); // called when new application is created and http request sent to /api/newAppEmail
// router.post('/api/closedAppEmail', email.closedSend); // called when application is called and http request sent to /api/closedAppEmail
// router.post('/api/deleteAppEmail', email.deletedSend); // called when application is deleted and http request sent to /api/deleteAppEmail

module.exports = router;
