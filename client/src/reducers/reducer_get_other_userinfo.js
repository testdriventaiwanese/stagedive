export default function (state = null, action) {
  switch (action.type) {
    case 'GET_OTHER_USERINFO':
      return action.payload.data[0].length === 0 ? [] : action.payload.data[0];
    default:
      return state;
  }
}
