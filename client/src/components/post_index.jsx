import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import EventList from '../containers/event-list';
import Friends from '../containers/friends';
import Artists from '../containers/artists';
import Auth from '../modules/auth';
import UpcomingEvent from '../containers/upcoming-event';

class PostIndex extends Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
  }
  render() {
    return (
      <div>
          <UpcomingEvent />
          <EventList />
          <Friends />
          <Artists />
      </div>
    );
  }
}

export default PostIndex;
