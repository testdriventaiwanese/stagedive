import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/post_index';
import SearchResults from './containers/search-results';
import SignUp from './containers/SignUpPage';
import LogIn from './containers/LoginPage';
import Account from './containers/account';
import Journal from './containers/journal';
import MapComponent from './containers/map';
import UserPage from './containers/user-page';
import EventDetail from './containers/event-detail';
import ArtistPage from './containers/artist-page';
import JournalSingle from './containers/journal-single';
import FriendsEventList from './containers/friends-events';
import Token from './containers/token';
// import Explore from './containers/explore';

export default(
  <Route path="/" component={App} >
    <IndexRoute component={PostIndex} />
    <Route path="signup" component={SignUp} />
    <Route path="results" component={SearchResults} />
    <Route path="login" component={LogIn} />
    <Route path="account" component={Account} />
    <Route path="/journal/:userId" component={Journal} />
    <Route path="explore" component={MapComponent} />
    <Route path="newsfeed" component={FriendsEventList} />
    <Route path="/view/:userId" component={UserPage} />
    <Route path="/event/:userId/:eventId" component={EventDetail} />
    <Route path="/artists/:artistId" component={ArtistPage} />
    <Route path="/journal/:userId/:eventId" component={JournalSingle} />
    <Route path="/token/:token" component={Token} />
  </Route>
);
