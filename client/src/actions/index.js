import axios from 'axios';
import APIKEYS from './APIKEYS.js';
const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const EVENT_SELECTED = 'EVENT_SELECTED';
export const SAVE_RESULT = 'SAVE_RESULT';

module.exports = {
  selectEvent(event) {
    return {
      type: EVENT_SELECTED,
      payload: event,
    };
  },
  searchEvents(query) {
    const url = ROOT_URL + 'keyword=' + query + '&&apikey=' + APIKEYS;
    const request = axios.get(url);
    console.log("REQUEST: ", request);
    return {
      type: SEARCH_EVENTS,
      payload: request,
    };
  },
  saveResult(result) {
    const resultObj = {
      tm_id: result.id,
      name: result.name,
      artist_name: JSON.stringify(result._embedded.attractions),
      date: result.dates.start.dateTime,
      event_url: result.url,
      venue: result._embedded.venues[0].name,
      venue_address: result._embedded.venues[0].address.line1,
      city: result._embedded.venues[0].city.name,
      zipcode: result._embedded.venues[0].postalCode,
      image: result._embedded.attractions[0].images[0].url,
      genre: result.classifications[0].genre.name,
      subgenre: result.classifications[0].subGenre.name,
      latitude: result._embedded.venues[0].location.latitude,
      longitude: result._embedded.venues[0].location.longitude,
      country: result._embedded.venues[0].country.name,
      sale_date: JSON.stringify(result.sales.public),
    }
    axios.post('/events/addevent', resultObj);

    return {
      type: SAVE_RESULT,
      payload: resultObj,
    }
  },
};
