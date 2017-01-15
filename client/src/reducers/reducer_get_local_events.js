export default function (state = {}, action) {
  switch (action.type) {
    case 'GET_LOCAL_EVENTS':
      const payload = action.payload;
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
}
