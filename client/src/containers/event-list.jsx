import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { selectEvent } from '../actions/index';
import { getEvents } from '../actions/index';

class EventList extends Component {
  componentWillMount() {
    this.props.getEvents();
  }

  renderList() {
    return this.props.events.map((event) => {
      return (
        <li
          key={event.id}

          className="list-group-item">
          <p>{event.name}</p>
          <p>{event.venue}</p>
          <p>{event.city}</p>
        </li>
      );
    });
  }
//          onClick={() => this.props.selectEvent(event)}
  render() {
    console.log('THESE ARE THE EVENTS IN RENDER:', this.props.events);
    return (
      <div>
        <h1>Events Feed</h1>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    events: state.getEvents
  };
}


export default connect(mapStateToProps, {getEvents})(EventList);
