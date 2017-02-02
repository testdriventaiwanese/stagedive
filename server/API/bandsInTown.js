const request = require('request');

module.exports = {
  getArtist: (req, res) => {
    // artist name sent down in headers, pull artist key
    const artist = req.headers.artist;
    request.get({
      url: `http://api.bandsintown.com/artists/${artist}.json?api_version=2.0&app_id=concert_wallet`,
    }, (err, resp, body) => {
      if (err) {
        console.log('Error in bandsInTown API call: ', err);
        return err;
      }
      return res.status(200).send(body);
    });
  },
};
