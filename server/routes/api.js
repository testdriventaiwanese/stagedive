const express = require('express');
const userController = require('../user/userController');
const eventController = require('../event/eventController');
const artistsController = require('../artists/artistsController');
const commentsController = require('../comments/commentsController');
const bandsintown = require('../API/bandsInTown');
const songkick = require('../API/songkick');
const ticketmaster = require('../API/ticketmaster');
const distance = require('../API/distance');

const router = new express.Router();

// user calls
router.post('/users/addfollow', userController.users.addfollow);
router.post('/users/unfollow', userController.users.unfollow);
router.post('/users/changepassword', userController.users.changepassword);
router.get('/users/getall', userController.users.getAll);
router.get('/users/getinfo', userController.users.getInfo);
router.get('/users/getotherinfo', userController.users.getOtherInfo);
router.get('/users/getfriends', userController.users.getFriends);
router.get('/users/getotherfriends', userController.users.getOtherFriends);
router.post('/users/finduser', userController.users.findUser);

// event calls
router.get('/events/getall', eventController.events.getUserEvents);
router.get('/events/getuserevents', eventController.events.getOtherUserEvents);
router.get('/events/getfriendsevents', eventController.events.getFriendsEvents);
router.post('/events/addevent', eventController.events.addEvent);
router.post('/events/deleteevent', eventController.events.deleteEvent);

// comment calls
router.get('/comments/getcomments', commentsController.comments.getComments);
router.post('/comments/addcomment', commentsController.comments.addComment);
router.post('/comments/removecomment', commentsController.comments.removeComment);

// artist calls
router.get('/artists/getall', artistsController.getUserArtists);
router.post('/artists/addartist', artistsController.addArtist);
router.post('/artists/deleteartist', artistsController.deleteArtist);

// bandsintown api call
router.get('/bandsintown/getartist', bandsintown.getArtist);

// songkick api call
router.get('/songkick/getartist', songkick.getArtist);
router.get('/songkick/getartistcalendar', songkick.getArtistCalendar);
router.get('/songkick/getlocalevents', songkick.getLocalEvents);
router.get('/songkick/getlocation', songkick.getLocation);

// ticketmaster api call
router.get('/ticketmaster/searchticketmaster', ticketmaster.searchTicketmaster);

// googlemapsmatrix api call
router.post('/distance/getdistanceinfo', distance.getDistanceInfo);

module.exports = router;
