export default function(state = [], action) {
  switch(action.type) {
  case 'LOG_IN':
    return action.payload;
  }
  return state;
}
