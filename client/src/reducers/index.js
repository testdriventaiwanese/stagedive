import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import ActiveEvent from './reducer_active_event';
import SearchEvents from './reducer_search_events';
import SaveResult from './reducer_save_result';
import GetEvents from './reducer_get_events';
import GetUserInfo from './reducer_get_userinfo';
import SignUp from './reducer_sign_up';
import LogIn from './reducer_log_in';
import RemoveEvent from './reducer_remove_event';
import SearchArtists from './reducer_search_artists';

const rootReducer = combineReducers({
  events: EventsReducer,
  activeEvent: ActiveEvent,
  searchEvents: SearchEvents,
  saveResult: SaveResult,
  getEvents: GetEvents,
  getUserInfo: GetUserInfo,
  signUp: SignUp,
  logIn: LogIn,
  removeEvent: RemoveEvent,
  searchArtists: SearchArtists,
});

export default rootReducer;
