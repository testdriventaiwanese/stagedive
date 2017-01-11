import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';
import { Link, hashHistory } from 'react-router';
import moment from 'moment';
import { getUserEvents, getUserInfo, removeEvent, getEvents } from '../actions/index';
import Auth from '../modules/auth';

class UpcomingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentWillMount() {
    const id = localStorage.getItem('id');
    const user = { id };
    this.props.getUserInfo();
    this.props.getUserEvents(user);
  }
  handleTouchTap() {
    this.setState({
      open: true,
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  renderUpcoming() {
    const id = localStorage.getItem('id');
    const imageStyle = {
      width: '100%',
    };
    const largestPic = (imageArray) => {
      let largest = 0;
      let index;
      imageArray.forEach((image, i) => {
        if(image.width > largest) {
          largest = image.width;
          index = i;
        }
      });
      return imageArray[index].url;
    }
    let sortByDate = [];
    if(!this.props.events.futureEvents) {
      return (
        <Card>
          <h6>No Upcoming Events</h6>
        </Card>
      );
    }
    if(this.props.events.futureEvents.length > 0) {
      const event = this.props.events.futureEvents[0];
      const momentDate = moment(event.date).format('LLLL');
      const momentFromNow = moment(event.date).fromNow();
      const est = moment(event.date)._d;
      const artist = JSON.parse(event.artist_name).map((performer) => performer.name);
      const date = momentDate.toString() + ' ' + est.toString().slice(34);
      let image = null;
      if(event.image){
        image = largestPic(JSON.parse(event.image)) || null;
      };
      const venue = JSON.parse(event.venue)[0];
      let venueName = null;
      let venueStateOrCountry = null;
      if (venue.state) {
        venueName = venue.state.name;
        venueStateOrCountry = venue.state.stateCode;
      } else if (venue.country) {
        venueName = venue.country.name;
        venueStateOrCountry = venue.country.countryCode;
      }
      return (
        <Card className="list-group-item" zDepth={1} >
          <IconMenu
            style={{float:'right', position:'relative', zIndex:2}}
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            useLayerForClickAway={true}
            >
            <Link to={`/event/${id}/${event.id}`}>
              <MenuItem primaryText="View Event Details" secondary />
            </Link>
            <MenuItem
              primaryText="Remove Event"
              secondary
              onTouchTap={this.handleTouchTap}
              onClick={() => this.props.removeEvent(event.tm_id, 0)}
              />
            <Snackbar
              open={this.state.open}
              message="Removed Event"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
              />
          </IconMenu>
          <CardHeader title={<h5>Upcoming Event</h5>} subtitle={<h6>{momentFromNow.toString()}</h6>} />
          <CardMedia>
            <img src={image} style={imageStyle} />
          </CardMedia>
          <CardText>
            <h5><strong>{event.name}</strong></h5>
            <br />
            <span><strong>Listed acts: </strong>{artist.join(', ')}</span>
            <br />
            <span><strong>Venue: </strong>{venue.name}</span>
            <br />
            <span><strong>Event Start: </strong>{date}</span>
          </CardText>
          <CardActions>
            <Link to={`/event/${id}/${event.id}`}>
              <FlatButton label='Event Details' secondary />
            </Link>
            <a href={event.event_url}><FlatButton label='Buy Tickets' secondary /></a>
          </CardActions>
        </Card>
      );
    }
  }

  render() {
    return (
        <div>
          {this.renderUpcoming()}
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


export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvent);
