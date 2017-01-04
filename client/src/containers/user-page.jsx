import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
// import { selectEvent } from '../actions/index';
import { getOtherUserEvents, removeEvent, addFollower, unfollow } from '../actions/index';

class UserPage extends Component {
  componentWillMount() {
    // this.props.getOtherUserEvents();
  }

  renderProfileBar() {
    console.log('THIS IS THE EVENTS OBJECT IN USER PAGE: ', this.props.events);
    if(!this.props.events.userInfo) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <h1>
          {this.props.events.userInfo.fullname}
        </h1>
        <button onClick={() => this.props.addFollower(this.props.events.userInfo.id)}>Follow</button>
        <button onClick={() => this.props.unfollow(this.props.events.userInfo.id)}>UnFollow</button>
      </div>
    )
  }

  renderUpcoming() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    let sortByDate = [];

    if(this.props.events.futureEvents.length > 0) {
      let event = this.props.events.futureEvents[0];
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      // let dateObj = new Date(event.date.slice(0,10));
      // let date = dateObj.toString();
      let time = event.date.slice(11, 16);
      return (
        <div className="list-group-item">
          <h1>Upcoming Event</h1>
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
    }
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

    return this.props.events.futureEvents.slice(1).map((event) => {
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
        <div>{this.renderProfileBar()}</div>
        <div>{this.renderUpcoming()}</div>
        <h1>Events Feed</h1>
        <ul className="list-group col-sm-16">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.userEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getOtherUserEvents, addFollower, unfollow }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
