export default function(state = { events: [], futureEvents: [] }, action) {
  switch(action.type) {
    case 'GET_USER_EVENTS':
    console.log('THIS IS THE GET USER EVENTS REDUCER: ', action.payload);
      let userInfo = action.payload.config.headers.userInfo;
      let events = action.payload.data.length === 0 ? state : action.payload.data;
      let currentDate = new Date();
      let futureEvents = events.sort((a, b) => {
        let aDate = new Date(a.date.slice(0,10));
        let bDate = new Date(b.date.slice(0,10));
        return aDate - bDate;
      })
      .filter((event) => {
        let eventDate = new Date(event.date.slice(0,10));
        return eventDate > currentDate;
      })
      return {
        events,
        futureEvents,
        userInfo,
      }
    default:
      return state;
  }
}
