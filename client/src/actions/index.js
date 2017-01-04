import { hashHistory } from 'react-router';
import axios from 'axios';
import APIKEYS from './APIKEYS.js';

const TM_ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';

// import {searchArtists} from '../../../server/API/bandsInTown.js';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const EVENT_SELECTED = 'EVENT_SELECTED';
export const SAVE_EVENT = 'SAVE_EVENT';
export const SAVE_ARTIST = 'SAVE_ARTIST';
export const GET_EVENTS = 'GET_EVENTS';
export const GET_ARTISTS = 'GET_ARTISTS';
export const GET_USERINFO = 'GET_USERINFO';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const SEARCH_ARTISTS = 'SEARCH_ARTISTS';
export const SEARCH_USERS = 'SEARCH_USERS';
export const UNFOLLOW = 'UNFOLLOW';
export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_USER_EVENTS = 'GET_USER_EVENTS';

module.exports = {
  selectEvent(event) {
    return {
      type: EVENT_SELECTED,
      payload: event,
    };
  },
  searchEvents(query) {
    const url = TM_ROOT_URL + 'keyword=' + query + '&&apikey=' + APIKEYS.TM;
    const request = axios.get(url);
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
      hashHistory.push('/');
    });

    return {
      type: SAVE_EVENT,
      payload: eventObj,
    };
  },
  saveArtist(bandsintown, songkick) {
    console.log('save artist bandsintown? ', bandsintown)
    console.log('save artist songkick? ', songkick)
    const config = {
      headers: { authHeader: localStorage.getItem('token') },
    };
    const artistObj = {
      mbid: songkick.identifier[0].mbid,
      name: songkick.displayName,
      image: bandsintown.image_url,
      events: songkick.uri,
      facebook: bandsintown.facebook_page_url,
      onTourUntil: songkick.onTourUntil,
      upcoming_events: bandsintown.upcoming_event_count,
    };
    axios.post('/api/artists/addartist', artistObj, config)
      .then(() => {
        hashHistory.push('/');
      })
    return {
      type: SAVE_ARTIST,
      payload: artistObj,
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
      hashHistory.replace('/');
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
  getArtists() {
    const config = {
      headers: { authheader: localStorage.getItem('token') },
    };
    const request = axios.get('/api/artists/getall', config)
    .catch(() => {
      return { data: [] };
    });
    return {
      type: 'GET_ARTISTS',
      payload: request,
    };
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
        hashHistory.push('/');
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
      hashHistory.push('/');
    })

    return {
      type: LOG_IN,
      payload: resultObj,
    };
  },
  logoutUser() {
    console.log('loggingout')
    localStorage.removeItem('token')
    hashHistory.push('/login')
  },
  searchArtistEvents(query) {
    const config = {
      headers: {
        authHeader: localStorage.getItem('token'),
        mbid: query,
      },
    };
    const request = axios.get('/api/songkick/getevents', config);
    console.log('REQUEST FROM SONGKICK ARTIST EVENTS: ', request);
    // return {
    //   type: SEARCH_ARTISTS_EVENTS,
    //   payload: request,
    // };
  },
  searchArtists(query) {
    const config = {
      headers: {
        authHeader: localStorage.getItem('token'),
        artist: query,
      },
    };
    const bandsintownArtistSearch = () => {
      return axios.get('/api/bandsintown/getartist', config);
    }
    const songkickArtistSearch = () => {
      return axios.get('/api/songkick/getartist', config);
    }
    return {
      type: SEARCH_ARTISTS,
      payload: axios.all([bandsintownArtistSearch(), songkickArtistSearch()])
      .then(axios.spread((bandsintown, songkick) => {
        return { bandsintown, songkick };
      }))
      .catch(() => {
        return { bandsintown: [], songkick: [] };
      }),
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
  getOtherUserEvents(user) {
    const config = {
      headers: {
        authHeader: localStorage.getItem('token'),
        userId: user.id,
        userInfo: user,
      }
    };
    const request = axios.get('/api/events/getuserevents', config)
    .catch((res) => {
      return {data: []};
    });

    return {
      type: GET_USER_EVENTS,
      payload: request,
    }
  },
  getArtistCalendar(artistId) {
    const config = {
      headers: {
        authHeader: localStorage.getItem('token'),
        userId: user.id ,
        userInfo: user,
      }
    };
    const request = axios.get('/api/songkick/getartistcalendar', config)
    .catch((res) => {
      return {data: []};
    });

    return {
      type: GET_ARTIST_CALENDAR,
      payload: request,
    }
  },
};
