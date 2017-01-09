import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Link, hashHistory } from 'react-router';
import moment from 'moment';
import { getUserEvents, getUserInfo, removeEvent, getEvents } from '../actions/index';
import Auth from '../modules/auth';

class EventList extends Component {
  componentWillMount() {
    const id = localStorage.getItem('id');
    const user = { id };
    this.props.getUserInfo();
    this.props.getUserEvents(user);
  }

  renderUpcoming() {
    const id = localStorage.getItem('id');
    const imageDiv = {
      width: '30%',
      float: 'left',
      margin: '10px',
    };
    const imageStyle = {
      width: '100%',
    };
    let sortByDate = [];
    if(!this.props.events.futureEvents) {
      return (
        <div align='center'>
          <CircularProgress size={60} />
        </div>
      )
    }
    if(this.props.events.futureEvents.length > 0) {
      const event = this.props.events.futureEvents[0];
      const momentDate = moment(event.date).format('LLLL');
      const momentFromNow = moment(event.date).fromNow();
      const est = moment(event.date)._d;
      const artist = JSON.parse(event.artist_name).map((performer) => performer.name);
      const date = momentDate.toString() + ' ' + est.toString().slice(34);
      return (
        <Card className="list-group-item" zDepth={1} style={imageDiv} >
          <h1>Upcoming Event</h1>
          <CardMedia
            overlay={ <CardTitle title={event.name} subtitle={event.city + ', ' + momentFromNow.toString()} />} >
            <img src={event.image} style={imageStyle}/>
          </CardMedia>
          <CardText>
            <p><strong>{event.name}</strong></p>
            <p>Listed acts: {artist.join(', ')}</p>
            <p>{event.venue}</p>
            <p>{event.venue_address}</p>
            <span>{event.city}</span>
            <p>{event.country}</p>
            <p>Post code: {event.zipcode}</p>
            <p>Event Start: {date}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
          </CardText>
          <CardActions>
            <RaisedButton
                label="Remove Event"
                secondary
                onClick={() => this.props.removeEvent(event.tm_id, 0)}
            />
          <Link to={`/event/${id}/${event.id}`}>
              <RaisedButton label='View Event Details' secondary />
            </Link>
          </CardActions>
        </Card>
      );
    }
  }

  renderList() {
    const id = localStorage.getItem('id');
    const imageDiv = {
      width: '65%',
      float: 'left',
      margin: '10px',
    };
    const imageStyle = {
      width: '100%',
    };
    return this.props.events.futureEvents.slice(1).map((event, i) => {
      const momentDate = moment(event.date).format('LLLL');
      const momentNoDay = moment(event.date).format('LLL');
      const momentFromNow = moment(event.date).fromNow();
      const est = moment(event.date)._d;
      const date = momentDate.toString() + ' ' + est.toString().slice(34);
      const artist = JSON.parse(event.artist_name).map((performer) => performer.name);
      return (
        <Card key={event.id} className="list-group-item" zDepth={1} style={imageDiv}>
          <CardMedia
            overlay={ <CardTitle
            title={event.name}
            subtitle={event.city + ', ' + momentFromNow.toString()}
            />}
          >
            <img src={event.image} style={imageStyle} />
          </CardMedia>
          <CardText>
            <p><strong>{event.name}</strong></p>
            <p>Listed Acts: {artist.join(', ')}</p>
            <p>{event.venue}</p>
            <p>{event.venue_address}</p>
            <span>{event.city}</span>
            <p>{event.country}</p>
            <p>Post code: {event.zipcode}</p>
            <p>Event Start: {date}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
          </CardText>
          <CardActions>
            <RaisedButton
                label="Remove Event"
                secondary
                onClick={() => this.props.removeEvent(event.tm_id, i + 1)}
            />
          <Link to={`/event/${id}/${event.id}`}>
              <RaisedButton label='View Event Details' secondary />
            </Link>
          </CardActions>
        </Card>
      );
    });
  }
  render() {
    return (
      <div>
        <div>{this.renderUpcoming()}</div>
        <h1>Events Feed</h1>
        <div className="list-group col-sm-16">
          {this.renderList()}
        </div>
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
  return bindActionCreators({ getUserEvents, getUserInfo, removeEvent, getEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EventList);
