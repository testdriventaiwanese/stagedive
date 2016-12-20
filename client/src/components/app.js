import React from 'react';
import { Component } from 'react';

import EventList from '../containers/event-list';
import EventDetail from '../containers/event-detail';
import SearchBar from '../containers/searchbar';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <EventList />
        <EventDetail />
      </div>
    );
  }
}
