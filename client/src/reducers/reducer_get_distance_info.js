export default function (state = {}, action) {
  switch (action.type) {
    case 'GET_DISTANCE_INFO':
      return action.payload
    default:
      return state;
  }
}
