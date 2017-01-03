export default function(state = [], action) {
  switch(action.type) {
  case 'SAVE_ARTIST':
  console.log('ACTION GOT IN SAVE ARTIST RESULT: ', action);
    return action.payload;
  }
  return state;
}
