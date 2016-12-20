import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import ActiveEvent from './reducer_active_event';

const rootReducer = combineReducers({
  events: EventsReducer,
  activeEvent: ActiveEvent,
});

export default rootReducer;
