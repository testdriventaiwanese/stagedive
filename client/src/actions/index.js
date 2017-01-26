import { hashHistory } from 'react-router';
import axios from 'axios';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const EVENT_SELECTED = 'EVENT_SELECTED';
export const SAVE_EVENT = 'SAVE_EVENT';
export const SAVE_ARTIST = 'SAVE_ARTIST';
export const GET_EVENTS = 'GET_EVENTS';
export const FRIENDS_EVENTS = 'FRIENDS_EVENTS';
export const GET_ARTISTS = 'GET_ARTISTS';
export const GET_USERINFO = 'GET_USERINFO';
export const GET_OTHER_USERINFO = 'GET_OTHER_USERINFO';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const SEARCH_ARTISTS = 'SEARCH_ARTISTS';
export const SEARCH_USERS = 'SEARCH_USERS';
export const UNFOLLOW = 'UNFOLLOW';
export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_OTHER_FRIENDS = 'GET_OTHER_FRIENDS';
export const GET_USER_EVENTS = 'GET_USER_EVENTS';
export const GET_ARTIST_CALENDAR = 'GET_ARTIST_CALENDAR';
export const REMOVE_ARTIST = 'REMOVE_ARTIST';
export const GET_EVENT_COMMENTS = 'GET_EVENT_COMMENTS';
export const GET_LOCAL_EVENTS = 'GET_LOCAL_EVENTS';
export const SHOW_LOCAL_EVENTS = 'SHOW_LOCAL_EVENTS';
export const ADD_EVENT_COMMENT = 'ADD_EVENT_COMMENT';
export const REMOVE_EVENT_COMMENT = 'REMOVE_EVENT_COMMENT';
export const REFRESH_EVENT_COMMENTS = 'REFRESH_EVENT_COMMENTS';
export const GET_DISTANCE_INFO = 'GET_DISTANCE_INFO';

export function searchEvents(query) {
  const config = {
    headers: {
      authHeader: localStorage.getItem('token'),
      tmquery: query,
    },
  };
  const tmRequest = axios.get('/api/ticketmaster/searchticketmaster', config);
  return {
    type: SEARCH_EVENTS,
    payload: tmRequest,
  };
}

export function saveEvent(event) {
  let eventObj;
  if (!event._embedded) {
    eventObj = {
      tm_id: event.id || null,
      name: event.name || null,
      date: event.dates.start.dateTime || null,
      event_url: event.url || null,
      sale_date: JSON.stringify(event.sales.public) || null,
    };
  } else {
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
      venue: JSON.stringify(event._embedded.venues) || null,
      image: JSON.stringify(event._embedded.attractions[0].images) || null,
      genre: JSON.stringify(event.classifications[0]) || null,
      latitude: latitude,
      longitude: longitude,
      sale_date: JSON.stringify(event.sales) || null,
    };
  }
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  axios.post('/api/events/addevent', eventObj, config)
  .then(() => {
    hashHistory.push('/');
  });
  return {
    type: SAVE_EVENT,
    payload: eventObj,
  };
}

export function saveArtist(bandsintown, songkick) {
  const artistObj = {
    mbid: songkick.identifier[0].mbid,
    name: songkick.displayName,
    image: bandsintown.image_url,
    events: songkick.uri,
    facebook: bandsintown.facebook_page_url,
    onTourUntil: songkick.onTourUntil,
    upcoming_events: bandsintown.upcoming_event_count,
  };
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  axios.post('/api/artists/addartist', artistObj, config)
    .then(() => {
      hashHistory.push('/');
    });
  return {
    type: SAVE_ARTIST,
    payload: artistObj,
  };
}

export function removeEvent(tm_id, i) {
  const resultObj = {
    tm_id,
  };
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  axios.post('/api/events/deleteevent', resultObj, config)
    .then(() => {
      hashHistory.replace('/');
    });
  return {
    type: REMOVE_EVENT,
    tm_id,
    i,
  };
}

export function removeArtist(artist_mbid, i) {
  const resultObj = {
    artist_mbid,
  };
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  axios.post('/api/artists/deleteartist', resultObj, config)
    .then(() => {
      hashHistory.replace('/');
    });
  return {
    type: REMOVE_ARTIST,
    artist_mbid,
    i,
  };
}

export function getFriendsEvents() {
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  const request = axios.get('/api/events/getfriendsevents', config)
    .catch(() => {
      return { data: [] };
    });
  return {
    type: FRIENDS_EVENTS,
    payload: request,
  };
}

export function getUserInfo() {
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  const request = axios.get('/api/users/getinfo', config)
    .catch(() => {
      return { data: [] };
    });
  return {
    type: GET_USERINFO,
    payload: request,
  };
}

export function getOtherUserInfo(userid) {
  const config = {
    headers: { authHeader: localStorage.getItem('token'),
      userid },
  };
  const request = axios.get('/api/users/getotherinfo', config)
    .catch(() => {
      return { data: [] };
    });
  return {
    type: GET_OTHER_USERINFO,
    payload: request,
  };
}


export function getFriends() {
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  const getFriendsRequest = axios.get('/api/users/getfriends', config)
    .catch(() => {
      return { data: [] };
    });
  return {
    type: GET_FRIENDS,
    payload: getFriendsRequest,
  };
}

export function getOtherFriends({ id }) {
  const config = {
    headers: {
      authHeader: localStorage.getItem('token'),
      id,
    },
  };
  const getOtherFriendsRequest = axios.get('/api/users/getotherfriends', config)
    .catch(() => {
      return { data: [] };
    });
  return {
    type: GET_OTHER_FRIENDS,
    payload: getOtherFriendsRequest,
  };
}

export function getArtists() {
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  const request = axios.get('/api/artists/getall', config)
    .catch(() => {
      return { data: [] };
    });
  return {
    type: GET_ARTISTS,
    payload: request,
  };
}

export function searchUsers(userQuery) {
  const userQueryObj = {
    query: userQuery,
  };
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  const searchUserResult = axios.post('/api/users/finduser', userQueryObj, config)
    .catch(() => { data: [] } );
  return {
    type: SEARCH_USERS,
    payload: searchUserResult,
  };
}

export function addFollower(userId) {
  const addFollowObj = {
    userId,
  };
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  axios.post('/api/users/addfollow', addFollowObj, config)
    .then(() => {
      hashHistory.push('/');
    })
    .catch(() => {
      return { data: [] };
    });
}

export function unfollow(userId, index) {
  const unfollowObj = {
    userId,
  };
  const config = {
    headers: { authHeader: localStorage.getItem('token') },
  };
  axios.post('/api/users/unfollow', unfollowObj, config);
  return {
    type: 'UNFOLLOW',
    userId,
    index,
  };
}

export function signUp(result) {
  const resultObj = {
    email: result.email,
    password: result.password,
    fullname: result.name,
  };
  axios.post('/auth/signup', resultObj)
    .then((res) => {
      if (res.data.success) {
        const loginObj = {
          email: result.email,
          password: result.password,
        }
        axios.post('/auth/login', loginObj)
          .then((loginRes) => {
            if(loginRes.data.success){
              localStorage.setItem('token', loginRes.data.token);
              localStorage.setItem('id', loginRes.data.userId);
              hashHistory.push('/');
            }
          });
      }
    });
  return {
    type: SIGN_UP,
    payload: resultObj,
  }
}

export function logIn(result) {
  const resultObj = {
    email: result.email,
    password: result.password,
  };
  axios.post('/auth/login', resultObj)
    .then((res) => {
      if(res.data.success){
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id', res.data.userId);
        hashHistory.push('/');
      }
    });
  return {
    type: LOG_IN,
    payload: resultObj,
  };
}

export function searchArtists(query) {
  const artistConfig = {
    headers: {
      authHeader: localStorage.getItem('token'),
      artist: query,
    },
  };
  const bandsintownArtistSearch = () => axios.get('/api/bandsintown/getartist', artistConfig);
  const songkickArtistSearch = () => axios.get('/api/songkick/getartist', artistConfig);
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
}

export function searchNearby(google, map, request) {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status, pagination) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(results, pagination);
      } else {
        reject(results, status);
      }
    });
  });
}

export function getUserEvents(user) {
  const userEventsConfig = {
    headers: {
      authHeader: localStorage.getItem('token'),
      userId: user.id,
      userInfo: user,
    },
  };
  const request = axios.get('/api/events/getuserevents', userEventsConfig)
  return {
    type: GET_USER_EVENTS,
    payload: request,
  };
}

export function getArtistCalendar(artist) {
  const getArtistConfig = {
    headers: {
      authHeader: localStorage.getItem('token'),
      mbid: artist.mbid,
    }
  };
  const request = axios.get('/api/songkick/getartistcalendar', getArtistConfig)
    .catch(() => {
      return { data: [] };
    });
  return {
    type: GET_ARTIST_CALENDAR,
    payload: request,
  };
}

export function addEventComment(eventId, userId, friendId, text) {
  let commentObj = {
    id_event: eventId,
    userId,
    friendId,
    text,
  };
  const addEventCommentConfig = {
    headers: {
      authheader: localStorage.getItem('token'),
      eventId,
      userId,
    },
  };
  const request = axios.post('/api/comments/addcomment', commentObj, addEventCommentConfig);
  return {
    type: ADD_EVENT_COMMENT,
    payload: request,
  };
}

export function getEventComments(userId, eventId) {
  const getEventCommentsConfig = {
    headers: {
      authheader: localStorage.getItem('token'),
      eventId,
      userId,
    },
  };
  const request = axios.get('/api/comments/getcomments', getEventCommentsConfig);
  return {
    type: GET_EVENT_COMMENTS,
    payload: request,
  };
}

export function removeEventComment(comment) {
  const commentObj = {
    commentId: comment.id,
  };
  const removeEventCommentConfig = {
    headers: {
      authheader: localStorage.getItem('token'),
      eventId: comment.id_event,
      userId: comment.id_friend,
    },
  };
  axios.post('/api/comments/removecomment', commentObj, removeEventCommentConfig);
  return {
    type: REMOVE_EVENT_COMMENT,
    payload: commentObj,
  };
}

export function refreshEventComments() {
  const obj = { comments: [], posterInfo: [] };
  return {
    type: REFRESH_EVENT_COMMENTS,
    payload: obj,
  };
}

export function getLocation(query) {
  const config = {
    headers: {
      authHeader: localStorage.getItem('token'),
      latitude: query.latitude,
      longitude: query.longitude,
    }
  };
  return axios.get('/api/songkick/getlocation', config)
    .then((res) => {
      const metroId = res.data.resultsPage.results.location[0].metroArea.id
      return {
        type: metroId
      };
    });
}

export function getLocalEvents(id) {
  const config = {
    headers: {
      authHeader: localStorage.getItem('token'),
      id,
    }
  };
  const request = axios.get('/api/songkick/getlocalevents', config)
  .then((res) => {
    return {
      resultsPage: res.data.resultsPage.results.event,
    }
  });
  return {
    type: GET_LOCAL_EVENTS,
    payload: request,
  };
}

export function showLocalEvents(concerts) {
  return {
    type: SHOW_LOCAL_EVENTS,
    payload: concerts,
  };
}

export function getDistanceInfo(locations) {
  const mapCoords = {
    originLatitude: locations[0][0],
    originLongitude: locations[0][1],
    destinationLatitude: locations[1][0],
    destinationLongitude: locations[1][1],
  };
  const config = {
    headers: {
      authHeader: localStorage.getItem('token'),
    },
  };
  const request = axios.post('/api/distance/getdistanceinfo', mapCoords, config)
  .then((res) => {
    return {
      distance: res.data.rows[0].elements[0].distance.text,
      duration: res.data.rows[0].elements[0].duration.text,
    }
  });
  return {
    type: GET_DISTANCE_INFO,
    payload: request,
  };
}
