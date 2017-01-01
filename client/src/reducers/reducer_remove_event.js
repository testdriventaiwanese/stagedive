import { browserHistory } from 'react-router';

export default function (state = [], action) {
  switch (action.type) {
    case 'REMOVE_EVENT':
      return action.payload;
    default:
      return state;
  }
}
