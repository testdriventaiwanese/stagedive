const eventModel = require('./eventModel');
const jwt = require('jsonwebtoken');

module.exports = {
  events: {
    getUserEvents(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      eventModel.events.getUserEvents(id.sub, (results) => {
        if (!results) {
          console.log('ERROR in getting all');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      });
    },
    getOtherUserEvents(req, res) {
      const otherUserId = req.headers.userId;
      eventModel.events.getUserEvents(otherUserId, (results) => {
        if (!results) {
          console.log('ERROR in getting all');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      });
    },
    getFriendsEvents(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      eventModel.events.getFriendsEvents(id.sub, (results) => {
        if (!results) {
          console.log('ERROR in getting all');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      });
    },
    search({ body: { name } }, res) {
      eventModel.events.searchEvents(name, (results) => {
        if (!results) {
          console.log('ERROR in searching');
          res.sendStatus(401);
        } else {
          console.log('searched');
          res.sendStatus(200);
        }
      });
    },
    addEvent({ body: {
      tm_id,
      name,
      artist_name,
      date,
      event_url,
      venue,
      venue_address,
      city,
      zipcode,
      image,
      genre,
      subgenre,
      latitude,
      longitude,
      country,
      sale_date,
    }, headers }, res) {
      const userId = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      console.log(userId);
      const params = [
        tm_id,
        name,
        artist_name,
        date,
        event_url,
        venue,
        venue_address,
        city,
        zipcode,
        image,
        genre,
        subgenre,
        latitude,
        longitude,
        country,
        sale_date,
      ];
      eventModel.events.addEvent(userId.sub, params, (results) => {
        if (!results) {
          console.log('Issue in adding EVENT to database');
          res.sendStatus(401);
        } else {
          console.log('RESULTS FROM ADD EVENT: ', results);
          res.status(200).send(results);
        }
      });
    },

    showUserEvents({ body: { userId } }, res) {
      eventModel.events.userEvents(userId, (results) => {
        if (!results) {
          console.log('ERROR');
          res.sendStatus(401);
        } else {
          console.log(res);
          res.sendStatus(200);
        }
      });
    },

    showLocalEvents({ body: { location, city, zipcode } }, res) {
      const params = [location, city, zipcode];
      eventModel.events.localEvents(params, (results) => {
        if (!results) {
          console.log('Issue in showing local events');
          res.sendStatus(401);
        } else {
          console.log(res);
          res.sendStatus(200);
        }
      });
    },

    showRelatedEvents({ body: { genre } }, res) {
      eventModel.events.relatedEvents(genre, (results) => {
        if (!results) {
          console.log('Issue in showing related events');
          res.sendStatus(401);
        } else {
          console.log(res);
          res.sendStatus(200);
        }
      });
    },

    deleteEvent({ body: { tm_id, userId } }, res) {
      const id = jwt.decode(userId, process.env.JWT_SECRET);
      const params = [tm_id, id.sub];
      eventModel.events.deleteEvent(params, (results) => {
        if (!results) {
          console.log('Issue in removing events');
          res.sendStatus(401);
        } else {
          console.log('removed');
          res.sendStatus(200);
        }
      });
    },
  },
};
