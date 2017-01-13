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
      // , (results) => {
      //   if (!results) {
      //     console.log('ERROR in getting all');
      //     res.sendStatus(401);
      //   } else {
      //     res.status(200).send(results);
      //   }
      // });
    },
    getOtherUserEvents(req, res) {
      const otherUserId = req.headers.userid;
      eventModel.events.getUserEvents(otherUserId)
      .then((results) => {
        res.status(200).send(results);
      })
      // , (results) => {
      //   if (!results) {
      //     console.log('ERROR in getting all');
      //     res.sendStatus(401);
      //   } else {
      //   }
      // });
    },
    getFriendsEvents(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      eventModel.events.getFriendsEvents(id.sub)
      .then((results) => {
        res.status(200).send(results);
      })
      // , (results) => {
      //   if (!results) {
      //     console.log('ERROR in getting all');
      //     res.sendStatus(401);
      //   } else {
      //   }
      // });
    },
    search({ body: { name } }, res) {
      eventModel.events.searchEvents(name)
      .then((results) => {
        res.sendStatus(200);
      })
      // , (results) => {
      //   if (!results) {
      //     console.log('ERROR in searching');
      //     res.sendStatus(401);
      //   } else {
      //     console.log('searched');
      //   }
      // });
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
      // , (results) => {
      //   if (!results) {
      //     console.log('Issue in adding EVENT to database');
      //     res.sendStatus(401);
      //   } else {
      //     console.log('RESULTS FROM ADD EVENT: ', results);
      //   }
      // });
    },

    showUserEvents({ body: { userId } }, res) {
      eventModel.events.userEvents(userId)
      .then((results) => {
        res.sendStatus(200);

      })
      // , (results) => {
      //   if (!results) {
      //     console.log('ERROR');
      //     res.sendStatus(401);
      //   } else {
      //     console.log(res);
      //   }
      // });
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
      eventModel.events.relatedEvents(genre)
      .then((results) => {
        res.sendStatus(200);

      })
      // , (results) => {
      //   if (!results) {
      //     console.log('Issue in showing related events');
      //     res.sendStatus(401);
      //   } else {
      //     console.log(res);
      //   }
      // });
    },

    deleteEvent(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      const params = [req.body.tm_id, id.sub];
      eventModel.events.deleteEvent(params)
      .then((results) => {
        res.sendStatus(200);
      })
      // , (results) => {
      //   if (!results) {
      //     console.log('Issue in removing events');
      //     res.sendStatus(401);
      //   } else {
      //     console.log('removed');
      //   }
      // });
    },
  },
};
