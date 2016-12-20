export default function(state = 'DEFAULT', action) {
  switch(action.type) {
  case 'SEARCH_EVENTS':
    return action.payload;
  }
  return state;
}
