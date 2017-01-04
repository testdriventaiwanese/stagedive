import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
// import { selectEvent } from '../actions/index';
import { getEvents, removeEvent, getUserInfo } from '../actions/index';
import AppBar from '../containers/app-bar';

class JournalSingle extends Component {
  // componentWillMount() {
  // }

  render() {
    console.log('THIS IS THE PARAMS: ', this.props.params);
    const i = this.props.events.pastEvents.findIndex((event) => event.tm_id === this.props.params.eventTmId);
    let event = this.props.events.pastEvents[i];
    let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
    let time = event.date.slice(11, 16);
    let userId = this.props.userInfo
    let imageDiv = {
      width: '60%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };

    return (
      <div>
        <h1>Concert Journal</h1>
        <ul className="list-group col-sm-16">
          <Paper style={imageDiv} zDepth={2}>
          <div key={event.id}>
            <img src={event.image} style={imageStyle}/>
            <span><strong>{event.name}</strong></span>
            <p>Date: {date}</p>
          </div>
        </Paper>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.getEvents,
    userInfo: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getEvents, getUserInfo }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(JournalSingle);
