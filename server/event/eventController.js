const eventModel = require('./eventModel');

module.exports = {
  events: {
    getAll(req, res) {
      eventModel.events.getall((results) => {
        if (!results) {
          console.log('ERROR in getting all');
          res.sendStatus(401);
        } else {
          console.log('got all');
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
    } }, res) {
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
      ];
      eventModel.events.addEvent(params, (results) => {
        if (!results) {
          console.log('Issue in adding EVENT to database');
          res.sendStatus(401);
        } else {
          console.log(results);
          res.sendStatus(200);
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

    deleteEvents({ body: { name } }, res) {
      eventModel.events.removeEvents(name, (results) => {
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
