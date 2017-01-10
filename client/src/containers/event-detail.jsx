import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';
import moment from 'moment';
import { removeEvent, getUserEvents } from '../actions/index';


class EventDetail extends Component {
  constructor(props) {
    super(props);
     this.state = {
       open: false,
     };
   }

   handleTouchTap = () => {
     this.setState({
       open: true,
     });
   };

   handleRequestClose = () => {
     this.setState({
       open: false,
     });
   };
  componentWillMount() {
    const userid = Number(this.props.params.userId);
    this.props.getUserEvents({id: userid});
  }
  renderEvent() {
    if (!this.props.event.events[0]) {
      return <div>Event Not Listed</div>;
    }
    const eventArr = this.props.event.events.filter((event) => {
      return event.id === Number(this.props.params.eventId);
    });
    const event = eventArr[0];
    const momentDate = moment(event.date).format('LLLL');
    const momentFromNow = moment(event.date).fromNow();
    const est = moment(event.date)._d;
    const artist = JSON.parse(event.artist_name).map((performer) => performer.name);
    const date = momentDate.toString() + ' ' + est.toString().slice(34);
    let image = null;
    if(event.image){
      image = JSON.parse(event.image)[3].url || null;
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
    const genreParse = JSON.parse(event.genre);
    let genre = null;
    if(genreParse.genre.name !== undefined){
      genre = genreParse.genre.name;
    }
    const imageDiv = {
      width: '45%',
      float: 'center',
      height: '248px',
      margin: '10px',
    };
    const imageStyle = {
      width: '90%',
      height: '90%',
    };
    return (
      <Card key={event.id} className="list-group-item" zDepth={1}>
        <CardMedia>
          <img src={image} style={imageStyle} />
        </CardMedia>
        <CardActions>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText="Remove Event"
              secondary
              onTouchTap={this.handleTouchTap}
              onClick={() => this.props.removeEvent(event.tm_id, 0)}
              />
              <Snackbar
                open={this.state.open}
                message="Event Removed"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
          </IconMenu>
        </CardActions>
        <CardText>
          <h1>{event.name}</h1>
          <p>Listed acts: {artist.join(', ')}</p>
          <p>{venue.name}</p>
          <p>Location: {venue.address.line1}</p>
          <span>{venue.city.name}</span>
          <p>{venueName + ', ' + venueStateOrCountry}</p>
          <p>Post code: {venue.postalCode}</p>
          <p>Event Start: {date}</p>
          <p>{genre}</p>
          <p><a href={event.event_url}>Buy Tickets</a></p>
        </CardText>
      </Card>
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
    event: state.userEvents,
  };
}

export default connect(mapStateToProps, { removeEvent, getUserEvents })(EventDetail);
