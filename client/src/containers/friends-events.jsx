import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFriendsEvents, removeEvent } from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';

class FriendsEventList extends Component {
  componentWillMount() {
    this.props.getFriendsEvents();
  }

  renderList() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    return this.props.events.map((event) => {
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      return (
        <div key={event.id} className="list-group-item">
          <div style={imageDiv}>
              <img src={event.image} style={imageStyle}></img>
          </div>
          <div>
            <p><strong>{event.name}</strong></p>
            <p>{event.venue}</p>
            <span>{event.city}</span>
            <p>{event.country}</p>
            <span>Date: {date}</span>
            <p>Time: {time}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
            <p onClick={() => this.props.removeEvent(event)}>Remove Event</p>
          </div>
        </div>
      );
    });
  }
  render() {
    console.log('THESE ARE THE EVENTS IN FRIENDS EVENTS RENDER:', this.props.events);
    return (
      <div>
        <h1>Events Feed</h1>
        <ul className="list-group col-sm-16">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.getFriendsEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFriendsEvents, removeEvent }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FriendsEventList);
