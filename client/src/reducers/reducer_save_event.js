import { hashHistory } from 'react-router';

export default function(state = [], action) {
  switch(action.type) {
  case 'SAVE_EVENT':
    return action.payload;
  }
  return state;
}
