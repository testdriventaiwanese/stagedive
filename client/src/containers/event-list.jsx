import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { selectEvent } from '../actions/index';
import { getEvents, removeEvent, getUserInfo } from '../actions/index';
import Upcoming from './upcoming-event';

class EventList extends Component {
  componentWillMount() {
    this.props.getEvents();
    // this.props.getUserInfo();
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
    // const dateStr = this.props.userInfo[0].createdOn.slice(0,19);
    // let currentDate = new Date(dateStr);
    //
    // let futureEvents = this.props.events.filter((event) => {
    //   let eventDate = new Date(event.date.slice(0,19));
    //   return eventDate > currentDate;
    // });
    let currentDate = new Date();

    return this.props.events.sort((a, b) => {
      let aDate = new Date(a.date.slice(0,10));
      let bDate = new Date(b.date.slice(0,10));
      return aDate - bDate;
    })
    .slice(1)
    .map((event) => {
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      // let dateObj = new Date(event.date.slice(0,10));
      // let date = dateObj.toString();
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
            <span>{date}</span>
            <p>Time: {time}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
            <p onClick={() => this.props.removeEvent(event)}>Remove Event</p>
          </div>
        </div>
      );
    });
  }
//          onClick={() => this.props.selectEvent(event)}
  render() {
    console.log('THESE ARE THE EVENTS IN RENDER:', this.props.events);
    return (
      <div>
        <Upcoming />
        <h1>Events Feed</h1>
        <ul className="list-group col-sm-16">
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
    events: state.getEvents,
    userInfo: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getEvents, getUserInfo }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
