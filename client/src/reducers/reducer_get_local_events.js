export default function (state = {}, action) {
  switch (action.type) {
    case 'GET_LOCAL_EVENTS':
      console.log('GET LOCAL EVENTS ACTION.PAYLOAD!:: ', action.payload)
      const payload = action.payload;
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
}
