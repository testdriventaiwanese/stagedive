import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { addComment } from '../actions/index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});

  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.addComment(this.state.term, userId, friendId, eventId);
    this.setState({ term: '' });
    // hashHistory.push('/results');
  }

  render() {
    console.log('PROPS IN COMMENTBOX: ', this.props.params);
    return (
      <span>
        <MuiThemeProvider>
          <form onSubmit={this.onFormSubmit} className="input-group">
            <TextField
              style={{ color: 'white' }}
              placeholder="Add comment"
              value={this.state.term}
              onChange={this.onInputChange}
            />
            <span className="button-line">
              <FlatButton type="submit" label="Add" backgroundColor="#616161" style={{ color: 'white' }} />
            </span>
          </form>
        </MuiThemeProvider>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    // userInfo: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
