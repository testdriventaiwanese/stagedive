import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { selectEvent } from '../actions/index';
import { getEvents, removeEvent, getUserInfo } from '../actions/index';
import AppBar from '../containers/app-bar';

class Journal extends Component {
  componentWillMount() {
    this.props.getUserInfo();
    this.props.getEvents();
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

    const dateStr = this.props.userInfo[0].createdOn.slice(0,19);
    let currentDate = new Date();

    let pastEvents = this.props.events.filter((event) => {
      let eventDate = new Date(event.date.slice(0,19));
      console.log('CURRENT DATE: ', currentDate, 'EVENT DATE: ', eventDate);
      return eventDate < currentDate;
    });
    return pastEvents.map((event) => {
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      return (
        <div key={event.id} className="list-group-item">
          <div style={imageDiv}>
              <img src={event.image} style={imageStyle}/>
          </div>
          <div>
            <p><strong>{event.name}</strong></p>
            <p>{event.venue}</p>
            <span>{event.city}</span>
            <p>{event.country}</p>
            <span>Date: {date}</span>
            <p>Time: {time}</p>
            <p onClick={() => this.props.removeEvent(event)}>Remove Event</p>
          </div>
        </div>
      );
    });
  }
  render() {
    console.log('THESE ARE THE EVENTS IN RENDER:', this.props.events);
    return (
      <div>
        <h1>Concert Journal</h1>
        <ul className="list-group col-sm-16">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.getEvents,
    userInfo: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getEvents, getUserInfo }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Journal);
