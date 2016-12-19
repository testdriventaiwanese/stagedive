const router = require('express').Router();
const userController = require('./user/userController');
const eventController = require('./event/eventController');
// const email = require('./email/emailModel.js');

router.post('/api/users/signup', userController.signUp);
router.post('/api/users/signin', userController.signIn);


// Event routes here:



// see emailModel.js
// router.post('/api/newAppEmail', email.newSend); // called when new application is created and http request sent to /api/newAppEmail
// router.post('/api/closedAppEmail', email.closedSend); // called when application is called and http request sent to /api/closedAppEmail
// router.post('/api/deleteAppEmail', email.deletedSend); // called when application is deleted and http request sent to /api/deleteAppEmail

module.exports = router;
