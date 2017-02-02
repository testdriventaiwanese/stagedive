const eventModel = require('./eventModel');
const jwt = require('jsonwebtoken');


exports.getUserEvents = (req, res) => {
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  eventModel.getUserEvents(id.sub)
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    console.log('Error in getUserEvents Controller: ', err);
  });
};


exports.getOtherUserEvents = (req, res) => {
  const otherUserId = req.headers.userid;
  eventModel.getUserEvents(otherUserId)
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    console.log('Error in getOtherUserEvents Controller: ', err);
  });
};


exports.getFriendsEvents = (req, res) => {
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  eventModel.getFriendsEvents(id.sub)
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    console.log('Error in getFriendsEvents Controller: ', err);
  });
};


exports.addEvent = ({ body: {
  tm_id,
  name,
  artist_name,
  date,
  event_url,
  venue,
  image,
  genre,
  latitude,
  longitude,
  sale_date,
}, headers }, res) => {
  const userId = jwt.decode(headers.authheader, process.env.JWT_SECRET);
  const params = {
    tm_id,
    name,
    artist_name,
    date,
    event_url,
    venue,
    image,
    genre,
    latitude,
    longitude,
    sale_date,
  };
  eventModel.addEvent(userId.sub, params)
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    console.log('Error in addEvent Controller: ', err);
  });
};


exports.deleteEvent = (req, res) => {
  const id = jwt.decode(req.headers.authheader, process.env.JWT_SECRET);
  const params = {
    tm_id: req.body.tm_id,
    userId: id.sub,
  };
  eventModel.deleteEvent(params)
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('Error in deleteEvent Controller: ', err);
  });
};
