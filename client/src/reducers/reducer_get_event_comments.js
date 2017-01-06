export default function (state = { comments: [], posterInfo: [] }, action) {
  switch (action.type) {
    case 'GET_EVENT_COMMENTS':
    console.log('THIS IS THE GET EVENT COMMENTS: ', action)
      return action.payload.data.length === 0 ? { comments: [], posterInfo: [] } : action.payload.data;
    case 'ADD_EVENT_COMMENT':
      console.log('ACTION IN ADD COMMENT: ', action.payload);
      return state;
    default:
      return state;
  }
}
