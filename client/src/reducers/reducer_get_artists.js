export default function (state = [], action) {
  switch (action.type) {
    case 'GET_ARTISTS':
    console.log('THIS IS THE GET ARTIST: ', action.payload)
      return action.payload.data.length === 0 ? [] : action.payload.data;
    default:
      return state;
  }
}
