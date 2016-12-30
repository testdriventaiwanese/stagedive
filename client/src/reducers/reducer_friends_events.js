export default function (state = [], action) {
  switch (action.type) {
    case 'FRIENDS_EVENTS':
    console.log('FRIENDS EVENTS ACTION GOT: ', action.payload.data);
      return action.payload.data.length === 0 ? state : action.payload.data;
    default:
      return state;
  }
}
