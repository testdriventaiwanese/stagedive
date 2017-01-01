export default function (state = [], action) {
  switch (action.type) {
    case 'UNFOLLOW':
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1),
      ];
    default:
      return state;
  }
}
