export default function (state = [], action) {
  switch (action.type) {
    case 'SEARCH_ARTISTS':
    console.log('ARTISTS GOT: ', action.payload);
      if (!action.payload.data._embedded) {
        return [];
      }
      else {
        return action.payload.data._embedded.events;
      }
    default:
      return state;
  }
}
