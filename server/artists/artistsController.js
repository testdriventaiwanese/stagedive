const artistsModel = require('./artistsModel');
const jwt = require('jsonwebtoken');

module.exports = {
  artists: {
    getUserArtists(req, res) {
      const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
      artistsModel.artists.getUserArtists(id.sub, (results) => {
        if (!results) {
          console.log('ERROR in getting all');
          res.sendStatus(401);
        } else {
          res.status(200).send(results);
        }
      });
    },
    search({ body: { name } }, res) {
      artistsModel.artists.searchArtists(name, (results) => {
        if (!results) {
          console.log('ERROR in searching');
          res.sendStatus(401);
        } else {
          console.log('searched');
          res.sendStatus(200);
        }
      });
    },
    addArtist({ body: {
      bit_id,
      name,
      image,
      events,
      facebook,
      upcoming_events,
    }, headers }, res) {
      const userId = jwt.decode(headers.authheader, process.env.JWT_SECRET);
      console.log(userId);
      const params = [
        bit_id,
        name,
        image,
        events,
        facebook,
        upcoming_events,
      ];
      artistsModel.artists.addArtist(userId.sub, params, (results) => {
        if (!results) {
          console.log('Issue in adding EVENT to database');
          res.sendStatus(401);
        } else {
          console.log('RESULTS FROM ADD EVENT: ', results);
          res.status(200).send(results);
        }
      });
    },
    showUserArtists({ body: { userId } }, res) {
      artistsModel.artists.userArtists(userId, (results) => {
        if (!results) {
          console.log('ERROR');
          res.sendStatus(401);
        } else {
          console.log(res);
          res.sendStatus(200);
        }
      });
    },
    deleteArtist({ body: { bit_id, userId } }, res) {
      const id = jwt.decode(userId, process.env.JWT_SECRET);
      const params = [bit_id, id.sub];
      artistsModel.artists.deleteArtist(params, (results) => {
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
