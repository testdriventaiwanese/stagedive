import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { getUserEvents, getUserInfo, removeEvent, getEvents } from '../actions/index';
import CommentInput from './comment-input';

class Comments extends Component {
  // componentDidMount() {
  //   let id = localStorage.getItem('id');
  //   let user = { id }
  //   this.props.getUserInfo();
  //   this.props.getUserEvents(user);
  // }

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
    return this.props.events.futureEvents.slice(1).map((event, i) => {
      console.log('event:: ', event);
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
              <RaisedButton
                  label="Remove Event"
                  secondary
                  onClick={() => this.props.removeEvent(event.tm_id, i + 1)}
              />
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
        <ul className="list-group col-sm-16">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.getEventComments,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserEvents, getUserInfo, removeEvent, getEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
