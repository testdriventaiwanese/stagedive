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
    const leftStyle = {
      width: '33%',
      float: 'left',
      marginTop: '10px',
    };
    const rightStyle = {
      width: '65%',
      float: 'right',
      marginBottom: '10px',
      marginTop: '10px',
    };
    return (
      <div>
        <div style={leftStyle}>
          <UpcomingEvent />
        </div>
        <div style={rightStyle}>
          <EventList />
        </div>
        <div style={leftStyle}>
          <Friends />
        </div>
        <div style={leftStyle}>
          <Artists />
        </div>
      </div>
    );
  }
}

export default PostIndex;
