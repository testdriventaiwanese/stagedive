const express = require('express');
const userController = require('../user/userController');
const eventController = require('../event/eventController');
const artistsController = require('../artists/artistsController');
const bandsintown = require('../API/bandsInTown');
const songkick = require('../API/songkick')

const router = new express.Router();

// user calls
router.post('/users/addfollow', userController.users.addfollow);
router.post('/users/unfollow', userController.users.unfollow);
router.post('/users/changepassword', userController.users.changepassword);
router.post('/users/deleteuser', userController.users.deleteUser);
router.get('/users/getall', userController.users.getAll);
router.get('/users/getinfo', userController.users.getInfo);
router.get('/users/getfriends', userController.users.getFriends);
router.post('/users/finduser', userController.users.findUser);

// event calls
router.get('/events/getall', eventController.events.getUserEvents);
router.get('/events/getfriendsevents', eventController.events.getFriendsEvents);
router.post('/events/search', eventController.events.search);
router.post('/events/addevent', eventController.events.addEvent);
router.get('/events/showuserevents', eventController.events.showUserEvents);
router.get('/events/showlocalevents', eventController.events.showLocalEvents);
router.get('/events/showrelatedevents', eventController.events.showRelatedEvents);
router.post('/events/deleteevent', eventController.events.deleteEvent);

// artist calls
router.get('/artists/getall', artistsController.artists.getUserArtists);
router.post('/artists/addartist', artistsController.artists.addArtist);
router.post('/artists/deleteartist', artistsController.artists.deleteArtist);
router.get('/artists/showuserartists', artistsController.artists.showUserArtists);
router.post('/artists/search', artistsController.artists.search);

// bandsintown api call
router.get('/bandsintown/getartist', bandsintown.getArtist);

// songkick api call
router.get('/songkick/getevents', songkick.getEvents);
router.get('/songkick/getartist', songkick.getArtist);


module.exports = router;
