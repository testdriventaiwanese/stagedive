import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent, logoutUser } from '../actions/index';
import { Link } from 'react-router';
import EventList from '../containers/event-list';
import Friends from '../containers/friends';
import EventDetail from '../containers/event-detail';
import SearchBar from '../containers/searchbar.jsx';
import SearchResults from '../containers/search-results';
import AppBar from '../containers/app-bar';
import Journal from '../containers/journal';
import DrawerLeft from '../containers/drawer';
// import Explorer from '../containers/explore';
class PostIndex extends Component {
  render() {
    return (
      <div>
        <div>
        </div>
        <div>
          <Link to={"account"}>My Account</Link>
          <Link to={"journal"}>Concert Journal</Link>
          <Link to={"explore"}>Explore</Link>
          <EventList />
          <Friends />
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
