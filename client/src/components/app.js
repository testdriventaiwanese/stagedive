import React, { Component } from 'react';

import EventList from '../containers/event-list';
import EventDetail from '../containers/event-detail';
import SearchBar from '../containers/searchbar.jsx';
import SearchResults from '../containers/search-results';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <EventList />
        <EventDetail />
        <h1>Search Results Below:</h1>
        <SearchResults />
      </div>
    );
  }
}
