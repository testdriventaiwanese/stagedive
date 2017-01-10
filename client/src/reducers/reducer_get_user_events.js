export default function(state = { events: null, futureEvents: null, pastEvents: null }, action) {
  switch (action.type) {
    case 'GET_USER_EVENTS':
      const userInfo = action.payload.config.headers.userId;
      const events = action.payload.data.length === 0 ? [] : action.payload.data;

      const currentDate = new Date();
      const sortedEvents = events.sort((a, b) => {
        const aDate = new Date(a.date.slice(0, 10));
        const bDate = new Date(b.date.slice(0, 10));
        return aDate - bDate;
      });
      let futureEvents = sortedEvents.filter((event) => {
        const eventDate = new Date(event.date.slice(0, 10));
        return eventDate > currentDate;
      });
      const pastEvents = sortedEvents.filter((event) => {
        const eventDate = new Date(event.date.slice(0, 10));
        return eventDate <= currentDate;
      });

      return {
        events,
        futureEvents,
        pastEvents,
        userInfo,
      }
    case 'REMOVE_EVENT':
      futureEvents = [
        ...state.futureEvents.slice(0, action.i),
        ...state.futureEvents.slice(action.i + 1)
      ];
      return {
        events: state.events,
        futureEvents,
        pastEvents: state.pastEvents,
        userInfo: state.userInfo,
      }
    default:
      return state;
  }
}
