export default function(state = [], action) {
  switch(action.type) {
  case 'SIGN_UP':
  console.log('ACTION GOT: ', action.payload);
    return action.payload;
  }
  return state;
}
