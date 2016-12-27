import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent, logoutUser } from '../actions/index';
import { Link } from 'react-router';
import EventList from '../containers/event-list';
import EventDetail from '../containers/event-detail';
import SearchBar from '../containers/searchbar.jsx';
import SearchResults from '../containers/search-results';


class PostIndex extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to={"signup"}>Sign Up</Link>
          <Link to={"login"}>Log In</Link>
          <Link to={"account"}>My Account</Link>
          <button onClick={() => this.props.logoutUser()}>LogOut</button>
          <SearchBar />
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
