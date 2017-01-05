import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { getFriendsEvents } from '../actions/index';

class FriendsEventList extends Component {
  componentWillMount() {
    this.props.getFriendsEvents();
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
    if(!this.props.events.futureEvents) {
      return <div>Loading News Feed...</div>
    }
    const userInfo = this.props.events.userInfo;
    const friendsEvents = this.props.events.friendsEvents;
    console.log('USERS in newsfeed: ', userInfo);
    console.log('FRIENDS in newsfeed: ', friendsEvents);
    return this.props.events.futureEvents.map((event) => {
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
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
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <h1>News Feed</h1>
        <ul className="list-group col-sm-16">
          {this.renderList()}
        </ul>
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
