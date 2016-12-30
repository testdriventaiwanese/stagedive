export default function(state = [], action) {
  switch(action.type) {
  case 'SEARCH_EVENTS':
  console.log('ACTION GOT: ', action.payload);
    if(!action.payload.data._embedded) {
      return [];
    }
    else {
      return action.payload.data._embedded.events;
    }
  }
  return state;
}
