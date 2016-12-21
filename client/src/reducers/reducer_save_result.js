export default function(state = [], action) {
  switch(action.type) {
  case 'SAVE_RESULT':
  console.log('ACTION GOT IN SAVE RESULT: ', action);
  //RETURN THE OBJECT WITH ALL THE KEYS
    return action.payload.data;
  }
  return state;
}
