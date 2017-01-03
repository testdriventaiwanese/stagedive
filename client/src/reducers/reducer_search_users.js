export default function (state = [], action) {
  switch (action.type) {
    case 'SEARCH_USERS':
      if (!action.payload.data) {
        return [];
      }
      else {
        console.log('SEARCH USERS REDUCER: ', action.payload.data);
        return action.payload.data;
      }
    default:
      return state;
  }
}
