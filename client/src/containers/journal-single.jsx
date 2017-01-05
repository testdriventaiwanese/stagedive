import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
// import { selectEvent } from '../actions/index';
import { getEvents, removeEvent, getUserInfo, addEventComment, getEventComments } from '../actions/index';
import AppBar from '../containers/app-bar';

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
    let userId = localStorage.getItem('id');
    let eventId = this.props.params.eventId;
    getEventComments(userId, eventId);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});

  }

  onFormSubmit(event) {
    event.preventDefault();
    let userId = localStorage.getItem('id');
    let eventId = this.props.params.eventId;
    this.props.addEventComment(this.state.term, userId, userId, eventId);
    this.setState({ term: '' });
    // hashHistory.push('/results');
  }

  // renderCommentInput() {
  //   console.log('PROPS IN COMMENTBOX: ', this.props.params);
  //   return (
  //     <span>
  //       <MuiThemeProvider>
  //         <form onSubmit={this.onFormSubmit} className="input-group">
  //           <TextField
  //             style={{ color: 'white' }}
  //             placeholder="Add comment"
  //             value={this.state.term}
  //             onChange={this.onInputChange}
  //           />
  //           <span className="button-line">
  //             <FlatButton type="submit" label="Add" backgroundColor="#616161" style={{ color: 'white' }} />
  //           </span>
  //         </form>
  //       </MuiThemeProvider>
  //     </span>
  //   );
  // }

  render() {
    const i = this.props.events.pastEvents.findIndex((event) => event.id === Number(this.props.params.eventId));
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
          <div key={event.id} style={imageStyle}>
            <img src={event.image} style={imageStyle} />
            <span><strong>{event.name}</strong></span>
            <p>Date: {date}</p>
          </div>
        </Paper>
        </ul>
      </div>
    );
  }
}

// <div>{this.renderCommentInput()}</div>
function mapStateToProps(state) {
  return {
    events: state.getEvents,
    userInfo: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getEvents, getUserInfo, addEventComment, getEventComments }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(JournalSingle);
