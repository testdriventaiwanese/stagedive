export default function (state = [], action) {
  switch (action.type) {
    case 'GET_ARTISTS':
    console.log('THIS IS THE GET ARTIST: ', action.payload)
      return action.payload.data.length === 0 ? [] : action.payload.data;
    case 'REMOVE_ARTIST':
      console.log('REMOVE ARTIST ACTIOn:: ', action);
      console.log('REMOVE ARTIST STATE:: ', ...state);
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1),
      ]
    default:
      return state;
  }
}
