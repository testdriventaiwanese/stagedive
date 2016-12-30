export default function (state = [], action) {
  switch (action.type) {
    case 'SEARCH_ARTISTS':
    console.log('ARTISTS GOT: ', action.payload);
      if (!action.payload.data) {
        return [];
      }
      else {
        return action.payload.data;
      }
    default:
      return state;
  }
}
