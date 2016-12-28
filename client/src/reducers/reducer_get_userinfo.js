export default function (state = [], action) {
  switch (action.type) {
    case 'GET_USERINFO':
      console.log('AFTER GET USER INFO REDUCER INFO: ', action.payload)
      return action.payload.data.length === 0 ? state : action.payload.data; 
    default:
      return state;
  }
}
