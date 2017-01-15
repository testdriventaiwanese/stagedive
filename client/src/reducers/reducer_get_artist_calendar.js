export default function(state = [], action) {
  switch(action.type) {
    case 'GET_ARTIST_CALENDAR':
      return action.payload;
    default:
      return state;
  }
}
