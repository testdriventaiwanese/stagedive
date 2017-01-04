import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { removeEvent } from '../actions/index';


class EventDetail extends Component {
  renderEvent() {
    if (!this.props.event) {
      return <div>Event Not Listed</div>;
    }
    const eventArr = this.props.event.events.filter((event) => {
      return event.id === Number(this.props.params.eventId);
    });
    const event = eventArr[0];
    const saleTimes = JSON.parse(event.sale_date);
    const artistInfo = JSON.parse(event.artist_name);
    let imageDiv = {
      width: '45%',
      float: 'center',
      height: '248px',
      margin: '10px',
    };
    let imageStyle = {
      width: '100%',
    };
    return (
      <Paper key={event.id} className="list-group-item" zDepth={2}>
        <div style={imageDiv}>
            <img src={event.image} style={imageStyle}></img>
        </div>
        <div>
          <h2>{event.name}</h2>
          <p>{artistInfo.name}</p>
          <p>{event.city}</p>
          <p>{event.country}</p>
          <p>Event Date: {event.date}</p>
          <div>
            <h6>Tickets</h6>
            <p>On sale date: {saleTimes.startDateTime}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
          </div>
        </div>
        <RaisedButton
          label="Remove Event"
          secondary
          onClick={() => this.props.removeEvent(event.tm_id)}
        />
      </Paper>
    );
  }

  render() {
    return (
      <div>
        <h3>Event Details</h3>
        <div className="list-group col-sm-16">
          {this.renderEvent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.getEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
