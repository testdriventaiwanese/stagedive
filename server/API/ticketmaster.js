const request = require('request');

module.exports = {
  searchTicketmaster: (req, res) => {
    // pull search query out of request header, under key 'tmquery'
    const searchQuery = req.headers.tmquery;
    request.get({
      url: `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Music&keyword=${searchQuery}&&apikey=${process.env.TICKETMASTER_API}`,
    }, (err, resp, body) => {
      if (err) {
        console.log('Error with TicketMaster API call: ', err);
        return err;
      }
      return res.status(200).send(body);
    });
  },
};
