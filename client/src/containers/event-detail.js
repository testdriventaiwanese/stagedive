import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventDetail extends Component {
  render() {
    if (!this.props.event) {
      return <div>Select an event to get started.</div>;
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.event.name}</div>
        <div>ID: {this.props.event.id}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.activeEvent
  };
}

export default connect(mapStateToProps)(EventDetail);
