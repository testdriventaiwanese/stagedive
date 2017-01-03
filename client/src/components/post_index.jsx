import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent, logoutUser } from '../actions/index';
import EventList from '../containers/event-list';
import Friends from '../containers/friends';
import Artists from '../containers/artists';

class PostIndex extends Component {
  render() {
    return (
      <div>
        <div>
        </div>
        <div>
          <EventList />
          <Friends />
          <Artists />
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
