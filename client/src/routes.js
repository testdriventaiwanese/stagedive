import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/post_index';

export default(
  <Route path = "/" component={App} >
    <IndexRoute component={PostIndex} />
    <Route path="dashboard" component={'FILL IN LATER'} />
    <Route path="map" component={'FILL IN LATER'} />
    <Route path="upcoming" component={'FILL IN LATER'} />
  </Route>
);