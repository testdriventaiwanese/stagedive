import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addEventComment, removeEventComment } from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(event) {
    this.setState({ term: event.target.value });
  }
  onFormSubmit(event) {
    event.preventDefault();
    const userId = localStorage.getItem('id');
    const friendId = this.props.userInfo.userInfo;
    const eventId = this.props.params.eventId;
    this.props.addEventComment(eventId, userId, friendId, this.state.term);
    this.setState({ term: '' });
  }
  renderComments() {
    const commentStyle = {
      margin: '0px 0px 0px 15px',
    };
    return (
      this.props.comments.comments.map((comment) => {
        const userId = comment.id_user;
        let userObj = this.props.comments.posterInfo.filter((poster) => {
          return poster.id === userId;
        });
        if (userObj.length === 0) {
          userObj = [{ fullname: comment.fullname }];
        }
        return (
          <div key={comment.id} style={commentStyle}>
            <div>
              <IconButton
                onClick={() => this.props.removeEventComment(comment)}
                style={{ float: 'right', height: '0px' }}
              ><NavigationClose /></IconButton>
            </div>
            <div>
              <p>
                <strong>{userObj[0].fullname}: </strong>
                {comment.text}
              </p>
            </div>
          </div>
        );
      })
    );
  }

  renderAddComment() {
    return (
      <div>
        <MuiThemeProvider>
          <form onSubmit={this.onFormSubmit} className="input-group">
            <TextField
              style={{ color: 'white', width: '100%', margin: '0px 10px 0px 10px' }}
              placeholder="Add comment"
              value={this.state.term}
              onChange={this.onInputChange}
            />
          </form>
        </MuiThemeProvider>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.renderComments()}
        </div>
        <Paper zDepth={1}>
          {this.renderAddComment()}
        </Paper>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEventComment, removeEventComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comments);
