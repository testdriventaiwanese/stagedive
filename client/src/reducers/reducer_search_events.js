export default function(state = [], action) {
  switch(action.type) {
  case 'SEARCH_EVENTS':
    if(!action.payload.data._embedded) {
      return [];
    }
    else {
      return action.payload.data._embedded.events;
    }
  }
  return state;
}
