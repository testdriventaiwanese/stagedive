const eventModel = require('./eventModel');

module.exports = {
  events: {
    addEvents({ body: {userId, eventName, date, location, venue, city, zipcode, genre}}, res) {
      const params = [userId, eventName, date, location, venue, city, zipcode, genre]
      eventModel.events.newEvents(params, (results) {
        if(!response) {
          console.log('Issue in adding to database');
          res.sendStatus(401);
        } else {
          res.json({body});
        }
      })
    },

    search({body: {}})
  }
}
