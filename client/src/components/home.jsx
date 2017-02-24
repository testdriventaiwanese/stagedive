import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import EventList from '../containers/event-list';
import Friends from '../containers/friends';
import Artists from '../containers/artists';
import Auth from '../modules/auth';
import UpcomingEvent from '../containers/upcoming-event';

export default class Home extends Component {
  componentDidMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
  }

  render() {
    return (
      <div className="container-style">
        <div className="left-style">
          <UpcomingEvent className="fixed" />
          <br />
          <Friends className="fixed" />
          <br />
          <Artists className="fixed" />
        </div>
        <div className="right-style">
          <EventList />
        </div>
      </div>
    );
  }
}
