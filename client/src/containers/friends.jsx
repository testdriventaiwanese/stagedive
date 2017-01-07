import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { getFriends, unfollow, getOtherUserEvents } from '../actions/index';
import { Link } from 'react-router';


class Friends extends Component {
  componentWillMount() {
    this.props.getFriends();
  }

  renderFriends() {
    if(this.props.friends.length === 0) {
      return (
        <Card zDepth={1}>
          <CardText>
            You're not following any friends!
          </CardText>
          <br />
        </Card>
      )
    }

    return this.props.friends.map((friend, i) => {
      let avatar = <Avatar>{friend.fullname.slice(0,1)}</Avatar>;
      if (friend.profile_photo){
        avatar = <Avatar src={friend.profile_photo} />;
      }
      return (
        <Card key={friend.id} zDepth={1}>
          <Link to={`/view/${friend.id}`}>
            <CardHeader
              title={friend.fullname}
              subtitle={friend.email}
              avatar={avatar}
              onClick={() => this.props.getOtherUserEvents(friend)}
            />
          </Link>
          <CardActions>
            <button onClick={() => this.props.unfollow(friend.id, i)}>Unfollow</button>
          </CardActions>
          <br />
        </Card>
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
