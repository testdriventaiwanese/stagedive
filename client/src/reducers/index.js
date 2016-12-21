import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import ActiveEvent from './reducer_active_event';
import SearchBar from './reducer_searchbar';
import SaveResult from './reducer_save_result';

const rootReducer = combineReducers({
  events: EventsReducer,
  activeEvent: ActiveEvent,
  searchEvents: SearchBar,
  saveResult: SaveResult,
});

export default rootReducer;
