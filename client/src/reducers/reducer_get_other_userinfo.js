export default function (state = [], action) {
  switch (action.type) {
    case 'GET_OTHER_USERINFO':
    console.log('GET OTHER USER INFO CALLED ', action.payload.data);
      return action.payload.data.length === 0 ? [] : action.payload.data;
    default:
      return state;
  }
}
