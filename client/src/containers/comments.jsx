import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { addEventComment, removeEventComment } from '../actions/index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
    const friendId = this.props.userInfo.userInfo.id;
    const eventId = this.props.params.eventId;
    this.props.addEventComment(eventId, userId, friendId, this.state.term);
    this.setState({ term: '' });
  }

  renderComments() {
    console.log('PROPS IN COMMENTS: ', this.props);
    return (
      this.props.comments.comments.map((comment) => {
        const userId = comment.id_user;
        const userObj = this.props.comments.posterInfo.filter((poster) => {
          return poster.id === userId;
        });
        console.log('USER OBJ: ', userObj);
        return (
          <div key={comment.id}>
            <div>
              <button onClick={() => this.props.removeEventComment(comment)}>x</button>
            </div>
            <div>
              <p>
                <strong>{userObj[0].fullname}: </strong>
                {comment.text}
              </p>
            </div>
            </div>
        )
      })
    )
  }
  // <button className='remove-comment' onClick={this.props.removeComment.bind(null, this.props.params.postId, i)}>&times;</button>

  renderAddComment() {
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

  render() {
    return (
      <div>
        <div>
          {this.renderComments()}
        </div>
        <div>
          {this.renderAddComment()}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEventComment, removeEventComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(Comments);
