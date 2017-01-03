import { browserHistory } from 'react-router';

export default function(state = [], action) {
  switch(action.type) {
  case 'SAVE_EVENT':
  console.log('ACTION GOT IN SAVE RESULT: ', action);
    return action.payload;
  }
  return state;
}
