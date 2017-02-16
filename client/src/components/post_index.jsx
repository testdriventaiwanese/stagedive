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
    const containerStyle = {
      margin: '0px -20px 0px -20px',
    }
    const leftStyle = {
      width: '33%',
      minWidth: '300px',
      float: 'left',
      marginTop: '10px',
      margin: 'auto',
    };
    const rightStyle = {
      width: '65%',
      minWidth: '300px',
      float: 'left',
      overflow: 'scroll',
      marginTop: '10px',
      marginLeft: '10px',
    };
    return (
      <div style={containerStyle}>
        <div style={leftStyle}>
          <UpcomingEvent />
          <br />
          <Friends />
          <br />
          <Artists/>
        </div>
        <div style={rightStyle}>
          <EventList />
        </div>
      </div>
    );
  }
}

export default PostIndex;
