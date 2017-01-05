export default function (state = [], action) {
  switch (action.type) {
    case 'GET_FRIENDS':
      return action.payload.data.length === 0 ? [] : action.payload.data;
    case 'UNFOLLOW':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
}
