export default function(state = [], action) {
  switch(action.type) {
    case 'GET_EVENTS':
    console.log('THIS IS THE GET EVENTS REDUCER: ', action.payload);
      return action.payload.data.length === 0 ? state : action.payload.data;
    default:
      return state;
  }
}
