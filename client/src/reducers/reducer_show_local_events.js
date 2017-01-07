export default function (state = {}, action) {
    switch (action.type) {
      case 'SHOW_LOCAL_EVENTS':
        const payload = action.payload;
        console.log('SHOW LOCAL EVENTS PAYLOAD', payload)
        return {
          payload,
        }
      default:
        return state;
    }
  }
