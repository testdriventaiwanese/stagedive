export default function (state = [], action) {
  switch (action.type) {
    case 'GET_OTHER_FRIENDS':
      return action.payload.data.length === 0 ? [] : action.payload.data;
    default:
      return state;
  }
}
