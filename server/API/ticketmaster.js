const request = require('request');

module.exports = {
  searchTicketmaster: (req, res) => {
    const searchQuery = req.headers.tmquery;
    request.get({
      url: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Music&keyword=${searchQuery}&&apikey=${process.env.TICKETMASTERKEY}`,
      method: 'GET',
    }, (err, resp, body) => {
      if (err) {
        console.log('Error with TicketMaster API call: ', err);
        return err;
      }
      res.status(200).send(body);
    });
  },
};
