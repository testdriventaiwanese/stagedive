export default function(state = { events: [], futureEvents: [] }, action) {
  switch(action.type) {
    case 'GET_ARTIST_CALENDAR':
    console.log('THIS IS THE GET ARTIST CALENDAR REDUCER: ', action.payload);
      return action.payload;
    default:
      return state;
  }
}
