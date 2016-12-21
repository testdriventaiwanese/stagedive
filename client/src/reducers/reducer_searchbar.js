export default function(state = [], action) {
  switch(action.type) {
  case 'SEARCH_EVENTS':
  console.log('ACTION GOT: ', action.payload.data._embedded.events);
    return action.payload.data._embedded.events;
  }
  return state;
}
