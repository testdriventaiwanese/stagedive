import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent, logoutUser } from '../actions/index';
import { Link } from 'react-router';
import EventList from '../containers/event-list';
import EventDetail from '../containers/event-detail';
import SearchBar from '../containers/searchbar.jsx';
import SearchResults from '../containers/search-results';
import AppBar from '../containers/app-bar';

class PostIndex extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <div>
          <Link to={"account"}>My Account</Link>
          <EventList />
          <EventDetail />
        </div>
    </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent, logoutUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);
