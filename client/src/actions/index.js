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
    return {
      type: SAVE_RESULT,
      payload: result,
    }
  },
};
