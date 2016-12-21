import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/post_index';
import SearchResults from './containers/search-results';
import SignUp from './containers/SignUpPage';

export default(
  <Route path="/" component={App} >
    <IndexRoute component={PostIndex} />
    <Route path="signup" component={SignUp} />
    <Route path="results" component={SearchResults} />
  </Route>
);
