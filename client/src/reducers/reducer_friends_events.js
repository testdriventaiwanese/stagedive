export default function (state = { events: null, friendsEvents: null, futureEvents: null, userInfo: null }, action) {
  switch (action.type) {
    case 'FRIENDS_EVENTS':
      let userInfo = action.payload.data.userNames;
      let friendsEvents = action.payload.data.friendEvents;
      let events = action.payload.data.events.length === 0 ? [] : action.payload.data.events;
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
        friendsEvents,
        futureEvents,
        userInfo,
      };
    default:
      return state;
  }
}
