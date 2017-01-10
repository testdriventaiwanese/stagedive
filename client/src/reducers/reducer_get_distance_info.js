export default function (state = {}, action) {
  switch (action.type) {
    case 'GET_DISTANCE_INFO':
      console.log('GET DISTANCE INFO ACTION.PAYLOAD!:: ', action.payload)
      return action.payload
    default:
      return state;
  }
}
