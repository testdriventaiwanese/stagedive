const artistsModel = require('./artistsModel');
const jwt = require('jsonwebtoken');

module.exports = {
  artists: {
    getUserArtists(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      artistsModel.artists.getUserArtists(id.sub)
        .then((results) => {
          res.status(200).send(results);
        })
        .catch((err) => {
          console.log('Error in getUserArtists Controller: ', err);
        })
    },
    addArtist({ body: {
      mbid,
      name,
      image,
      events,
      facebook,
      onTourUntil,
      upcoming_events,
    }, headers }, res) {
      const userId = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      const params = {
        mbid,
        name,
        image,
        events,
        facebook,
        onTourUntil,
        upcoming_events,
      };
      artistsModel.artists.addArtist(userId.sub, params)
        .then((response) => {
          console.log('artist controller resp for add: ', response);
          res.status(200).send(response);
        })
        .catch((err) => {
          console.log('Error in addArtist Controller: ', err);
        })
      //   (results) => {
      //   if (!results) {
      //     console.log('Issue in adding ARTIST to database');
      //     res.sendStatus(401);
      //   } else {
      //     console.log('RESULTS FROM ADD ARTIST: ', results);
      //     res.status(200).send(results);
      //   }
    },
    deleteArtist(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      const params = [req.body.artist_mbid, id.sub];
      artistsModel.artists.deleteArtist(params)
        .then((results) => {
          res.sendStatus(200);
      })
      .catch((err) => {
        console.log('Error in deleteArtist Controller: ', err);
      })
    },
  },
};
