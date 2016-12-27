import axios from 'axios';
import APIKEYS from './APIKEYS.js';
const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';
import { browserHistory } from 'react-router';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const EVENT_SELECTED = 'EVENT_SELECTED';
export const SAVE_RESULT = 'SAVE_RESULT';
export const GET_EVENTS = 'GET_EVENTS';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const REMOVE_EVENT = 'REMOVE_EVENT'

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

    console.log('REQUEST: ', request);
    return {
      type: SEARCH_EVENTS,
      payload: request,
    };
  },
  saveResult(result) {
    let resultObj;
    if(!result._embedded) {
      resultObj = {
        tm_id: result.id || null,
        name: result.name || null,
        date: result.dates.start.dateTime || null,
        event_url: result.url || null,
        sale_date: JSON.stringify(result.sales.public) || null,
      };
    }
    else {
      let latitude = null;
      let longitude = null;
      if (result._embedded.venues[0].location) {
        latitude = result._embedded.venues[0].location.latitude || null;
        longitude = result._embedded.venues[0].location.longitude || null;
      }
      resultObj = {
        tm_id: result.id || null,
        name: result.name || null,
        artist_name: JSON.stringify(result._embedded.attractions) || null,
        date: result.dates.start.dateTime || null,
        event_url: result.url || null,
        venue: () => (result._embedded.venues[0].name ? result._embedded.venues[0].name : null),
        venue_address: result._embedded.venues[0].address.line1 || null,
        city: result._embedded.venues[0].city.name || null,
        zipcode: result._embedded.venues[0].postalCode || null,
        image: result._embedded.attractions[0].images[3].url || null,
        genre: result.classifications[0].genre.name || null,
        subgenre: result.classifications[0].subGenre.name || null,
        latitude: latitude,
        longitude: longitude,
        country: result._embedded.venues[0].country.name || null,
        sale_date: JSON.stringify(result.sales.public) || null,
      };
    }
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    axios.post('/api/events/addevent', resultObj, config);

    return {
      type: SAVE_RESULT,
      payload: resultObj,
    };
  },
  removeEvent(result) {
    let resultObj;
    console.log('removeEvent result:: ', result);
    resultObj = {
      tm_id: result.tm_id,
      userId: localStorage.getItem('token'),
    }

    console.log('removeEvent resultObj:: ', resultObj)
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    axios.post('/api/events/deleteevent', resultObj, config)

    return {
      type:REMOVE_EVENT,
      payload: resultObj,
    }
  },
  getEvents() {
    var config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    const request = axios.get('/api/events/getAll', config);
    console.log('THIS IS THE GETALL EVENTS REQUEST FROM ACTION: ', request);
    return {
      type: GET_EVENTS,
      payload: request,
    }
  },
  signUp(result) {
    console.log('SIGNUP RESULT BEFORE OBJ: ', result);
    const resultObj = {
      email: result.email,
      password: result.password,
      fullname: result.name,
    };
    axios.post('/auth/signup', resultObj).then((resp) => {
      console.log("RESPONSE FROM SIGNUP FRONT :", resp);
    });

    return {
      type: SIGN_UP,
      payload: resultObj,
    }
  },
  logIn(result) {
    const resultObj = {
      email: result.email,
      password: result.password,
    };
    axios.post('/auth/login', resultObj).then((res) => {
      console.log('RESPONSE FROM LOGIN FRONT ', res);
      return localStorage.setItem('token', res.data.token);
    })
    .then(() => {
      browserHistory.push('/');
    })


    return {
      type: LOG_IN,
      payload: resultObj,
    };
  },
  logoutUser() {
    console.log('loggingout')
    localStorage.removeItem('token')
    browserHistory.push('/login')
  },
};
