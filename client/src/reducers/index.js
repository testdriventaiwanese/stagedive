import { combineReducers } from 'redux';
import ActiveEvent from './reducer_active_event';
import SearchEvents from './reducer_search_events';
import SaveEvent from './reducer_save_event';
import SaveArtist from './reducer_save_artist';
import GetEvents from './reducer_get_events';
import GetFriendsEvents from './reducer_friends_events';
import GetUserInfo from './reducer_get_userinfo';
import GetFriends from './reducer_get_friends';
import GetArtists from './reducer_get_artists';
import SignUp from './reducer_sign_up';
import LogIn from './reducer_log_in';
import SearchArtists from './reducer_search_artists';
import SearchUsers from './reducer_search_users';
import UserEvents from './reducer_get_user_events';
import GetArtistCalendar from './reducer_get_artist_calendar';
import GetEventComments from './reducer_get_event_comments';
import GetLocalEvents from './reducer_get_local_events';
import ShowLocalEvents from './reducer_show_local_events';
import GetDistanceInfo from './reducer_get_distance_info';

const rootReducer = combineReducers({
  activeEvent: ActiveEvent,
  searchEvents: SearchEvents,
  saveEvent: SaveEvent,
  saveArtist: SaveArtist,
  getEvents: GetEvents,
  getFriendsEvents: GetFriendsEvents,
  getUserInfo: GetUserInfo,
  getFriends: GetFriends,
  getArtists: GetArtists,
  signUp: SignUp,
  logIn: LogIn,
  searchArtists: SearchArtists,
  searchUsers: SearchUsers,
  userEvents: UserEvents,
  getArtistCalendar: GetArtistCalendar,
  getEventComments: GetEventComments,
  getLocalEvents: GetLocalEvents,
  showLocalEvents: ShowLocalEvents,
  getDistanceInfo: GetDistanceInfo,
});

export default rootReducer;
