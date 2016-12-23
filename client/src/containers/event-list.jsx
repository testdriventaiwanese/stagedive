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
      let date = event.date.slice(5,9) + '-' + event.date.slice(0,4);
      let time = event.date.slice(11, 16);
      return (
        <li
          key={event.id}
          className="list-group-item">
          <p>{event.name}</p>
          <p>{event.venue}</p>
          <span>{event.city}</span>
          <p>{event.country}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
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
        <ul className="list-group col-sm-8">
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
