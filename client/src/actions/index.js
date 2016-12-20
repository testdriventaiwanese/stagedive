import axios from 'axios';

const TICKETMASTER_API = process.env.TICKETMASTER_API;
const ROOT_URL = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=3&dmaId=324&apikey=${TICKETMASTER_API}`;

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const EVENT_SELECTED = 'EVENT_SELECTED';

module.exports = {
  selectEvent(event) {
    return {
      type: EVENT_SELECTED,
      payload: event,
    };
  },
  searchEvents() {
    const url = `${ROOT_URL}`;
    const request = axios.get(url);
    return {
      type: SEARCH_EVENTS,
      payload: request,
    }
    .then((req) => {
      console.log('THIS IS THE REQ', req);
    });
  },
};
