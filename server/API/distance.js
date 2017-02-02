const request = require('request');

module.exports = {
  getDistanceInfo: (req, res) => {
    // pull location info out of request headers, contains a body object with
    // originLatitude, originLongitude, destinationLatitude, and destinationLongitude
    const location = {
      mapOrigin: {
        latitude: req.body.originLatitude,
        longitude: req.body.originLongitude,
      },
      mapDestination: {
        latitude: req.body.destinationLatitude,
        longitude: req.body.destinationLongitude,
      },
    };
    request.get({
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${location.mapOrigin.latitude},${location.mapOrigin.longitude}&destinations=${location.mapDestination.latitude},${location.mapDestination.longitude}&key=${process.env.GMATRIX_KEY}`,
    }, (err, resp, body) => {
      if (err) {
        console.log('Error in googleMapsMatrix API call: ', err);
        return err;
      }
      return res.status(200).send(body);
    });
  },
};
