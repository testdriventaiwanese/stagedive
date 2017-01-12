export default function (state = [], action) {
  switch (action.type) {
    case 'GET_ARTISTS':
      return action.payload.data.length === 0 ? [] : action.payload.data;
    case 'REMOVE_ARTIST':
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1),
      ]
    default:
      return state;
  }
}
