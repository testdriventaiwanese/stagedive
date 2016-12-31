export default function (state = [], action) {
  switch (action.type) {
    case 'GET_FRIENDS':
      console.log('GET FRIENDS REDUCER: ', action.payload)
      return action.payload.data.length === 0 ? state : action.payload.data;
    default:
      return state;
  }
}
