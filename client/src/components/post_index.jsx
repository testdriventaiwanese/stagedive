import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import EventList from '../containers/event-list';
import Friends from '../containers/friends';
import Artists from '../containers/artists';
import Auth from '../modules/auth';


class PostIndex extends Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
  }
  render() {
    let background = {
      background: '#FAFAFA',
    }
    return (
      <div style={background}>
        <div>
          <EventList />
          <Friends />
          <Artists />
        </div>
      </div>
    );
  }
}

export default PostIndex;
