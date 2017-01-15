const request = require('request');

module.exports = {
  getArtist: (req, res) => {
    const artist = req.headers.artist;
    request.get({
      url: `http://api.bandsintown.com/artists/${artist}.json?api_version=2.0&app_id=concert_wallet`,
      method: 'GET',
    }, (err, resp, body) => {
      if (err) {
        console.log('Error in bandsInTown API call: ', err);
        return err;
      }
      res.status(200).send(body);
    });
  },
};
