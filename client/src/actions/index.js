import axios from 'axios';
import APIKEYS from './APIKEYS.js';
const TM_ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';
const BIM_ROOT_URL = 'http://api.bandsintown.com/artists/';
import { browserHistory } from 'react-router';
// import {searchArtists} from '../../../server/API/bandsInTown.js';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const EVENT_SELECTED = 'EVENT_SELECTED';
export const SAVE_EVENT = 'SAVE_EVENT';
export const GET_EVENTS = 'GET_EVENTS';
export const GET_USERINFO = 'GET_USERINFO';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const SEARCH_ARTISTS = 'SEARCH_ARTISTS';
export const SEARCH_USERS = 'SEARCH_USERS';
export const UNFOLLOW = 'UNFOLLOW';
export const GET_FRIENDS = 'GET_FRIENDS';

module.exports = {
  selectEvent(event) {
    return {
      type: EVENT_SELECTED,
      payload: event,
    };
  },
  searchEvents(query) {
    const url = TM_ROOT_URL + 'keyword=' + query + '&&apikey=' + APIKEYS;
    const request = axios.get(url);

    console.log('REQUEST: ', request);
    return {
      type: SEARCH_EVENTS,
      payload: request,
    };
  },
  saveEvent(event) {
    let eventObj;
    if(!event._embedded) {
      eventObj = {
        tm_id: event.id || null,
        name: event.name || null,
        date: event.dates.start.dateTime || null,
        event_url: event.url || null,
        sale_date: JSON.stringify(event.sales.public) || null,
      };
    }
    else {
      let latitude = null;
      let longitude = null;
      if (event._embedded.venues[0].location) {
        latitude = event._embedded.venues[0].location.latitude || null;
        longitude = event._embedded.venues[0].location.longitude || null;
      }
      eventObj = {
        tm_id: event.id || null,
        name: event.name || null,
        artist_name: JSON.stringify(event._embedded.attractions) || null,
        date: event.dates.start.dateTime || null,
        event_url: event.url || null,
        venue: () => (event._embedded.venues[0].name ? event._embedded.venues[0].name : null),
        venue_address: event._embedded.venues[0].address.line1 || null,
        city: event._embedded.venues[0].city.name || null,
        zipcode: event._embedded.venues[0].postalCode || null,
        image: event._embedded.attractions[0].images[3].url || null,
        genre: event.classifications[0].genre.name || null,
        subgenre: event.classifications[0].subGenre.name || null,
        latitude: latitude,
        longitude: longitude,
        country: event._embedded.venues[0].country.name || null,
        sale_date: JSON.stringify(event.sales.public) || null,
      };
    }
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    axios.post('/api/events/addevent', eventObj, config)
    .then((resp) => {
      browserHistory.push('/');
    });

    return {
      type: SAVE_EVENT,
      payload: eventObj,
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
    .then(() => {
      browserHistory.replace('/');
    });

    return {
      type:REMOVE_EVENT,
      payload: resultObj,
    }
  },
  getEvents() {
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    const request = axios.get('/api/events/getAll', config)
    .catch((res) => {
      return {data: []};
    });
    return {
      type: GET_EVENTS,
      payload: request,
    }
  },
  getFriendsEvents() {
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    const request = axios.get('/api/events/getfriendsevents', config)
    .catch((res) => {
      return {data: []};
    });
    return {
      type: FRIENDS_EVENTS,
      payload: request,
    }
  },
  getUserInfo() {
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    let request = axios.get('/api/users/getinfo', config)
      .catch(() => {
        return {data: []};
      });

    return {
      type: GET_USERINFO,
      payload: request,
    }
  },
  getFriends() {
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    let getFriendsRequest = axios.get('/api/users/getfriends', config)
      .catch(() => {
        return {data: []};
      });

    return {
      type: GET_FRIENDS,
      payload: getFriendsRequest,
    }
  },
  searchUsers(userQuery) {
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    const userQueryObj = {
      query: userQuery,
    };
    let searchUserResult = axios.post('/api/users/finduser', userQueryObj, config)
      .catch(() => {
        return { data: [] };
      });
    return {
      type: SEARCH_USERS,
      payload: searchUserResult,
    };
  },
  addFollower(userId) {
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    const addFollowObj = {
      userId,
    };
    let addFollowerResult = axios.post('/api/users/addfollow', addFollowObj, config)
      .then(() => {
        browserHistory.push('/');
      })
      .catch(() => {
        return { data: [] };
      });
  },
  unfollow(userId, index) {
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    const unfollowObj = {
      userId,
    };
    let unfollowResult = axios.post('/api/users/unfollow', unfollowObj, config);
    return {
      type: 'UNFOLLOW',
      userId,
      index,
    }
  },
  signUp(result) {
    const resultObj = {
      email: result.email,
      password: result.password,
      fullname: result.name,
    };
    axios.post('/auth/signup', resultObj);

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
  searchArtists(query) {
    // const url = BIM_ROOT_URL + query + '.json?api_version=2.0&app_id=' + APIKEYS.BIM;
    const config = {
      headers: {'Access-Control-Allow-Origin': '*' },
    }
    const url = 'http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=asdfafd'
    const request = axios.get(url, config);
    // const request = searchArtists;
    console.log('REQUEST FROM BANDS IN TOWN: ', request);
    return {
      type: SEARCH_ARTISTS,
      payload: request,
    };
  },
  searchNearby(google, map, request) {
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, (results, status, pagination) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

          resolve(results, pagination);
        } else {
          reject(results, status);
        }
      })
    });
  },
};
