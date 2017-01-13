const eventModel = require('./eventModel');
const jwt = require('jsonwebtoken');

module.exports = {
  events: {
    getUserEvents(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      eventModel.events.getUserEvents(id.sub)
      .then((results) => {
        res.status(200).send(results)
      })
      .catch((err) => {
        console.log('Error in getUserEvents Controller: ', err);
      })
    },
    getOtherUserEvents(req, res) {
      const otherUserId = req.headers.userid;
      eventModel.events.getUserEvents(otherUserId)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        console.log('Error in getOtherUserEvents Controller: ', err);
      })
    },
    getFriendsEvents(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      eventModel.events.getFriendsEvents(id.sub)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        console.log('Error in getFriendsEvents Controller: ', err);
      })
    },
    search({ body: { name } }, res) {
      eventModel.events.searchEvents(name)
      .then((results) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('Error in searchEvents Controller: ', err);
      })
    },
    addEvent({ body: {
      tm_id,
      name,
      artist_name,
      date,
      event_url,
      venue,
      image,
      genre,
      latitude,
      longitude,
      sale_date,
    }, headers }, res) {
      const userId = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      const params = [
        tm_id,
        name,
        artist_name,
        date,
        event_url,
        venue,
        image,
        genre,
        latitude,
        longitude,
        sale_date,
      ];
      eventModel.events.addEvent(userId.sub, params)
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        console.log('Error in addEvent Controller: ', err);
      })
    },

    deleteEvent(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      const params = { tm_id: req.body.tm_id, userId: id.sub };
      eventModel.events.deleteEvent(params)
      .then((results) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('Error in deleteEvent Controller: ', err);
      })
    },
  },
};
