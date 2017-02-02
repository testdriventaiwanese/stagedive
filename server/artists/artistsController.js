const artistsModel = require('./artistsModel');
const jwt = require('jsonwebtoken');


exports.getUserArtists = (req, res) => {
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  artistsModel.getUserArtists(id.sub)
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    console.log('Error in getUserArtists Controller: ', err);
  });
};

// destructure request body and pull out the following attributes:
// mbid, name, image, events, facebook, onTourUntil, upcoming_events
exports.addArtist = ({ body: {
  mbid,
  name,
  image,
  events,
  facebook,
  onTourUntil,
  upcoming_events,
}, headers }, res) => {
  const userId = jwt.decode(headers.authheader, process.env.JWT_SECRET);
  // take destructured elements from req body and create new parameter object
  const params = {
    mbid,
    name,
    image,
    events,
    facebook,
    onTourUntil,
    upcoming_events,
  };
  artistsModel.addArtist(userId.sub, params)
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((err) => {
    console.log('Error in addArtist Controller: ', err);
  });
};


exports.deleteArtist = (req, res) => {
  // decode userId from authheader for user specific artist lookup
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  // pull artist_mbid from request body and insert into params object along with userId
  const params = { mbid: req.body.artist_mbid, userId: id.sub };
  artistsModel.deleteArtist(params)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('Error in deleteArtist Controller: ', err);
  });
};
