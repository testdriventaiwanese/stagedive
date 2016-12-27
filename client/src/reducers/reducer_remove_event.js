import { browserHistory } from 'react-router';

export default function(state = [], action) {
  switch(action.type) {
  case 'REMOVE_EVENT':
  console.log('ACTION GOT IN REMOVE RESULT: ', action);
    return action.payload;
  }
  return state;
}
