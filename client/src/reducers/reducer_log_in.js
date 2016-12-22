export default function(state = [], action) {
  switch(action.type) {
  case 'LOG_IN':
  console.log('ACTION GOT: ', action.payload);
    return action.payload;
  }
  return state;
}
