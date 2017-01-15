import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
// import { selectEvent } from '../actions/index';
import { getUserEvents, removeEvent, addEventComment, getEventComments } from '../actions/index';
import Comments from './comments';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

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
    this.props.getUserEvents({id: userId});
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
  }

  render() {
    let pastEvents = [];
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
    if(this.props.userInfo.pastEvents) {
      pastEvents = this.props.userInfo.pastEvents;
      const i = pastEvents.findIndex((event) => event.id === Number(this.props.params.eventId));
      let event = pastEvents[i];
      const date = event.date.slice(5, 10) + '-' + event.date.slice(0, 4);
      const time = event.date.slice(11, 16);
      const userId = this.props.userInfo.userInfo;
      let image = null;
      if(event.image){
        image = largestPic(JSON.parse(event.image)) || null;
      };
      let imageAndComments = {
        width: '100%',
        height: 'auto',
      }
      let imageDiv = {
        width: '60%',
        float: 'left',
      };
      let imageStyle = {
        width: '100%',
      };
      let commentsBoxStyle = {
        width: '39%',
        float: 'right',
        height: 'inherit',
      }
      let commentsHeader = {
        padding: '10px',
      }
      let commentsBottom = {
        height: '100%',
      }
      return (
          <div style={imageAndComments}>
            <Paper style={imageDiv} zDepth={1}>
                <img src={image} style={imageStyle} />
            </Paper>
            <div style={commentsBoxStyle} >
              <Paper zDepth={1} style={commentsHeader}>
                <span><strong>{event.name}</strong></span>
                <p>{date}</p>
              </Paper>
              <Paper zDepth={1} style={commentsBottom}>
                <Comments {...this.props} />
              </Paper>
            </div>
          </div>
      );
    }
    else {
      return (
        <div align='center'>
          <LinearProgress mode="indeterminate" />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userEvents,
    comments: state.getEventComments,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getUserEvents, addEventComment, getEventComments }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(JournalSingle);
