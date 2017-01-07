import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
// import { selectEvent } from '../actions/index';
import { userEvents, removeEvent, addEventComment, getEventComments } from '../actions/index';
import Comments from './comments';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class JournalSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    let userId = this.props.params.userId;
    let eventId = this.props.params.eventId;
    console.log('PROPS: ', this.props);
    this.props.getEventComments(userId, eventId);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});

  }

  onFormSubmit(event) {
    event.preventDefault();
    let userId = localStorage.getItem('id');
    let eventId = this.props.params.eventId;
    let friendId = this.userInfo.userInfo;
    this.props.addEventComment(this.state.term, userId, friendId, eventId);
    this.setState({ term: '' });
    // hashHistory.push('/results');
  }

  render() {
    const i = this.props.userInfo.pastEvents.findIndex((event) => event.id === Number(this.props.params.eventId));
    let event = this.props.userInfo.pastEvents[i];
    let date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
    let time = event.date.slice(11, 16);
    let userId = this.props.userInfo.userInfo;
    let imageDiv = {
      width: '60%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    console.log('GET EVENT COMMENTS IN JOURNAL SINGLE: ', this.props.comments);
    return (
      <div>
        <h1>Concert Journal</h1>
        <ul className="list-group col-sm-16">
          <Paper style={imageDiv} zDepth={2}>
          <div key={event.id} style={imageStyle}>
            <img src={event.image} style={imageStyle} />
            <span><strong>{event.name}</strong></span>
            <p>Date: {date}</p>
          </div>
          <div>
            <Comments {...this.props} />
          </div>
        </Paper>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userEvents,
    comments: state.getEventComments,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, userEvents, addEventComment, getEventComments }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(JournalSingle);
