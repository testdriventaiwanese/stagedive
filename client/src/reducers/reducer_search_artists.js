export default function (state = [], action) {
  switch (action.type) {
    case 'SEARCH_ARTISTS':
      if (!action.payload) {
        return state;
      }
      else {
        return action.payload;
      }
    default:
      return state;
  }
}
