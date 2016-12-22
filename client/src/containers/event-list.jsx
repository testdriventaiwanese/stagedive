import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index';
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
          {event.name}
        </li>
      );
    });
  }
//          onClick={() => this.props.selectEvent(event)}
  render() {
    console.log('THESE ARE THE EVENTS IN RENDER:', this.props.events);
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
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

// Anything returned from this function will end up as props
// on the BookList container
// function mapDispatchToProps(dispatch) {
//   // Whenever selectBook is called, the result shoudl be passed
//   // to all of our reducers
//   return bindActionCreators({ selectEvent: selectEvent }, dispatch);
// }

// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps, {getEvents})(EventList);
