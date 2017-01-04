const request = require('request');

module.exports = {
  getArtist: (req, res) => {
    const artist_name = req.headers.artist;
    request.get({
      url: `http://api.songkick.com/api/3.0/search/artists.json?query=${artist_name}&apikey=${process.env.SONGKICK_ID}`,
      method: 'GET',
    }, (err, resp, body) => {
      if (err) {
        console.log('Error in SongKick API call: ', err);
        return err;
      }
      res.status(200).send(body);
    });
  },
  getArtistCalendar: (req, res) => {
    const music_brainz_id = req.headers.mbid;
    request.get({
      url: `http://api.songkick.com/api/3.0/artists/mbid:${music_brainz_id}/calendar.json?apikey=${process.env.SONGKICK_ID}`,
      method: 'GET',
    }, (err, resp, body) => {
      if (err) {
        console.log('Error in SongKick API call: ', err);
        return err;
      }
      res.status(200).send(body);
    });
  },
};
