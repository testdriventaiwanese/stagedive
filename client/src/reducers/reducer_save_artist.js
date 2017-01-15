export default function(state = [], action) {
  switch(action.type) {
  case 'SAVE_ARTIST':
    return action.payload;
  }
  return state;
}
