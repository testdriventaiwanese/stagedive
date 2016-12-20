import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, browserHistory } from 'react-router';
import App from './components/app';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <Router history = {browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
