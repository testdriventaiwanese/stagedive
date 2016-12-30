const request = require('request');

formatUrl = (artist, city, state) => {
   let location = city.replace(/\s+/g, '%20')+","+state;
   console.log(location)
  `http://api.bandsintown.com/artists/${artist}/events/search.json?api_version=2.0&app_id=rhino_music&location=${location}&radius=25`
};

eventSearch = () => {
  request({url: 'http://api.bandsintown.com/artists/jai wolf.json?api_version=2.0&app_id=YASDFASDF'}, (error, res, body) => {
  	console.log("RES", res, "BODY", body)
    if (!error && res.statusCode === 200) {
      // callback(body);
    } else {
      // callback({ error: 'Error'});
    }
  });
};

module.exports = {
  searchArtists: eventSearch,
};
