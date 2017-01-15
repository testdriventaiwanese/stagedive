export default function(state = [], action) {
  switch(action.type) {
    case 'SIGN_UP':
      return action.payload;
  }
  return state;
}
