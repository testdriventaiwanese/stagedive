import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

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
      const date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      const time = event.date.slice(11, 16);
      return (
        <Card key={event.id} className="list-group-item">
          <CardHeader
            title={name.join(', ')}
            subtitle='going to:'
            avatar={<Avatar>{name.join(', ').slice(0,1)}</Avatar>}
            onClick={() => this.props.getOtherUserEvents(friend)}
          />
          <CardMedia
            overlay={<CardTitle title={event.name} subtitle={event.city} />}
          >
            <img src={event.image} style={imageStyle} />
          </CardMedia>
          <CardText>
            <p><strong>{event.name}</strong></p>
            <p>{event.venue}</p>
            <span>{event.city}</span>
            <p>{event.country}</p>
            <span>{date}</span>
            <p>Time: {time}</p>
            <p><a href={event.event_url}>Buy Tickets</a></p>
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
