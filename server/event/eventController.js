const eventModel = require('./eventModel');

module.exports = {
  events: {
    search({body: {name}}, res) {
      eventModel.events.searchEvents(name, (results) => {
        if(!results) {
          console.log('ERROR in searching');
          res.sendStatus(401);
        } else {
          console.log('searched');
          res.sendStatus(200);
        }
      })
    },

    addEvents({ body: {userId, eventName, date, location, venue, city, zipcode, genre}}, res) {
      const params = [userId, eventName, date, location, venue, city, zipcode, genre];
      eventModel.events.newEvents(params, (results) => {
        if(!response) {
          console.log('Issue in adding to database');
          res.sendStatus(401);
        } else {
          console.log(res);
          res.sendStatus(200);
        }
      })
    },

    showUserEvents({body: {userId}}, res){
      eventModel.events.userEvents(userId, (results) => {
        if(!results) {
          console.log('ERROR');
          res.sendStatus(401);
        } else {
          console.log(res);
          res.sendStatus(200);
        }
      })
    },

    showLocalEvents({body: {location, city, zipcode}}, res) {
       const params = [location, city, zipcode]
       eventModel.events.localEvents(params, (results) => {
        if(!results) {
          console.log('Issue in showing local events');
          res.sendStatus(401);
        } else {
          console.log(res);
          res.sendStatus(200);
        }
      })
    },

    showRelatedEvents({body: {genre}}, res) {
      eventModel.events.relatedEvents(genre, (results) => {
        if(!results) {
          console.log('Issue in showing related events');
          res.sendStatus(401);
        } else {
          console.log(res);
          res.sendStatus(200);
        }
      })
    },

    deleteEvents({body: {name}}, res) {
      eventsModel.events.removeEvents(name, (results) => {
        if(!results) {
          console.log('Issue in removing events');
          res.sendStatus(401);
        } else {
          console.log('removed');
          res.sendStatus(200);
        }
      })
    }
  }
}
