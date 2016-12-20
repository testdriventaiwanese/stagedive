const router = require('express').Router();
const userController = require('./user/userController');
const eventController = require('./event/eventController');
// const email = require('./email/emailModel.js');

router.post('/api/users/signup', userController.users.signup);
router.post('/api/users/signin', userController.users.signin);
router.post('/api/users/addfollow', userController.users.addfollow);
router.post('/api/users/unfollow', userController.users.unfollow);
router.post('/api/users/changepassword', userController.users.changepassword);
router.get('/api/users/getall', userController.users.getAll);
// Event routes here:

router.get('/api/events/getall', eventController.events.getAll);
router.post('/api/events/search', eventController.events.search);
router.post('/api/events/addevent', eventController.events.addEvent);
router.get('/api/events/showuserevents', eventController.events.showUserEvents);
router.get('/api/events/showlocalevents', eventController.events.showLocalEvents);
router.get('/api/events/showrelatedevents', eventController.events.showRelatedEvents);
router.post('/api/events/deleteevents', eventController.events.deleteEvents);


// see emailModel.js
// router.post('/api/newAppEmail', email.newSend); // called when new application is created and http request sent to /api/newAppEmail
// router.post('/api/closedAppEmail', email.closedSend); // called when application is called and http request sent to /api/closedAppEmail
// router.post('/api/deleteAppEmail', email.deletedSend); // called when application is deleted and http request sent to /api/deleteAppEmail

module.exports = router;
