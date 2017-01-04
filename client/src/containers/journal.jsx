import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
// import { selectEvent } from '../actions/index';
import { getEvents, removeEvent, getUserInfo } from '../actions/index';
import AppBar from '../containers/app-bar';

class Journal extends Component {
  componentWillMount() {
    this.props.getUserInfo();
    this.props.getEvents();
  }

  renderList() {
    let token = localStorage.getItem('token');
    let imageDiv = {
      width: '30%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };

    return this.props.events.pastEvents.map((event) => {
      let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      let time = event.date.slice(11, 16);
      let userId = this.props.userInfo
      return (
        <Paper style={imageDiv} zDepth={2}>
        <div key={event.id}>
          <Link to={`/journal/${event.tm_id}/${token}`}>
            <img src={event.image} style={imageStyle}/>
          </Link>
          <span><strong>{event.name}</strong></span>
          <p>Date: {date}</p>
        </div>
      </Paper>
      );
    });
  }

  render() {
    console.log('THESE ARE THE USERINFO IN RENDER:', this.props.userInfo);
    return (
      <div>
        <h1>Concert Journal</h1>
        <ul className="list-group col-sm-16">
          {this.renderList()}
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


export default connect(mapStateToProps, mapDispatchToProps)(Journal);
