import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { getEvents } from '../actions/index';

class EventList extends Component {
  componentWillMount() {
    this.props.getEvents();
  }

  renderUpcoming() {
    let imageDiv = {
      width: '30%',
      float: 'left',
      height: '248px',
      margin: '10px',
    };
    let imageStyle = {
      width: '100%',
    };
    let sortByDate = [];

    if(this.props.events.futureEvents.length > 0) {
      let event = this.props.events.futureEvents[0];
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      return (
        <Paper className="list-group-item" zDepth={2}>
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
            <Link to={`/event/${event.id}`}>
              <RaisedButton label='View Event Details' secondary />
            </Link>
          </div>
        </Paper>
      );
    }
  }

  renderList() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
      margin: '10px',
    };
    let imageStyle = {
      width: '100%',
    };
    console.log('renderList this.props.events.futureEvents:: ', this.props.events.futureEvents.slice(1))
    return this.props.events.futureEvents.slice(1).map((event) => {
      console.log('renderList event:: ', event)
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      return (
        <Paper key={event.id} className="list-group-item" zDepth={2}>
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
            <Link to={`/event/${event.id}`}>
              <RaisedButton label='View Event Details' secondary />
            </Link>
          </div>
        </Paper>
      );
    });
  }
  render() {
    return (
      <div>
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
    events: state.getEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
