import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import ActiveEvent from './reducer_active_event';
import SearchBar from './reducer_searchbar';
import SaveResult from './reducer_save_result';
import GetEvents from './reducer_get_events';
import SignUp from './reducer_sign_up';
import LogIn from './reducer_log_in';

const rootReducer = combineReducers({
  events: EventsReducer,
  activeEvent: ActiveEvent,
  searchEvents: SearchBar,
  saveResult: SaveResult,
  getEvents: GetEvents,
  signUp: SignUp,
  logIn: LogIn,
});

export default rootReducer;
