export default function (state = [], action) {
  switch (action.type) {
    case 'GET_EVENT_COMMENTS':
    console.log('THIS IS THE GET EVENT COMMENTS: ', action.payload)
      return action.payload.data.length === 0 ? [] : action.payload.data;
    default:
      return state;
  }
}
