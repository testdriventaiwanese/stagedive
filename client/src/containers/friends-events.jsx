import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';


import { getFriendsEvents } from '../actions/index';

class FriendsEventList extends Component {
  componentWillMount() {
    this.props.getFriendsEvents();
  }
  renderList() {
    const imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
      margin: '10px',
    };
    const imageStyle = {
      width: '100%',
    };
    if (!this.props.events.futureEvents) {
      return (
        <div align='center'>
          <CircularProgress size={60} />
        </div>
      );
    }
    const userInfo = this.props.events.userInfo;
    const friendsEvents = this.props.events.friendsEvents;
    return this.props.events.futureEvents.map((event) => {
      const eventUser = friendsEvents.filter((friend) => {
        return friend.id_events === event.id;
      }).map((val) => val.id_users);
      const name = userInfo.filter((user) => {
        return eventUser.indexOf(user.id) > -1;
      }).map((name) => name.fullname);
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
      return (
        <Card key={event.id} className="list-group-item">
          <CardHeader
            title={name.join(', ')}
            subtitle={`going to in ${momentFromNow.toString()}`}
            avatar={<Avatar>{name.join(', ').slice(0,1)}</Avatar>}
            onClick={() => this.props.getOtherUserEvents(friend)}
          />
          <CardMedia>
            <img src={image} />
          </CardMedia>
          <CardText>
            <span><strong>Listed acts: </strong>{artist.join(', ')}</span>
            <br />
            <span><strong>Venue: </strong>{venue.name}</span>
            <br />
            <span><strong>Event Start: </strong>{date}</span>
          </CardText>
        </Card>
      );
    });
  }
  render() {
    return (
      <div>
        <h1>News Feed</h1>
        <div className="list-group col-sm-16">
          {this.renderList()}
        </div>
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
  return bindActionCreators({ getFriendsEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FriendsEventList);
