export default function (state = [], action) {
  switch (action.type) {
    case 'GET_LOCAL_EVENTS':
      console.log('GET LOCAL EVENTS ACTION!:: ', action)
      return action.payload
    default:
      return state;
  }
}
