import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import { getFriends, unfollow, getOtherUserEvents } from '../actions/index';
import { Link } from 'react-router';


class Friends extends Component {
  componentDidMount() {
    this.props.getFriends();
  }

  renderFriends() {
    if(this.props.friends.length === 0) {
      return (
        <Paper zDepth={2}>
          <div>
            You're not following any friends!
          </div>
          <br />
        </Paper>
      )
    }

    return this.props.friends.map((friend, i) => {
      return (
        <Paper key={friend.id} zDepth={2}>
          <div>
            <Link to={`/view/${friend.id}`}>
              <div onClick={() => this.props.getOtherUserEvents(friend)}>{friend.fullname}</div>
            </Link>
            <div>{friend.email}</div>
            <button onClick={() => this.props.unfollow(friend.id, i)}>Unfollow</button>
          </div>
          <br />
        </Paper>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Following</h3>
        <div>{this.renderFriends()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friends: state.getFriends,
    userInfo: state.userEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFriends, unfollow, getOtherUserEvents }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Friends);
