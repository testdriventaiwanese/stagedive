import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { addEventComment, removeEventComment } from '../actions/index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount () {

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
    console.log('PROPS IN COMMENTS: ', this.props);
    return (
      this.props.comments.comments.map((comment) => {
        const userId = comment.id_user;
        let userObj = this.props.comments.posterInfo.filter((poster) => {
          return poster.id === userId;
        });
        if(userObj.length === 0) {
          userObj = [{ fullname: comment.fullname }];
        }
        return (
          <div key={comment.id} style={{ margin: "0px 0px 0px 15px" }}>
            <div>
              <IconButton onClick={() => this.props.removeEventComment(comment)}
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
              style={{ color: 'white', width: '100%', margin: "0px 10px 0px 10px" }}
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
