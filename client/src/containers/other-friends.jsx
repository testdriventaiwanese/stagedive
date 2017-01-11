import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';

class OtherFriends extends Component {
  renderFriends() {
    if (this.props.otherFriends.length === 0) {
      return (
        <Card zDepth={1}>
          <CardText>
            You're not following any friends!
          </CardText>
          <br />
        </Card>
      );
    }

    return this.props.otherFriends.map((friend, i) => {
      let avatar = <Avatar>{friend.fullname.slice(0, 1)}</Avatar>;
      if (friend.profile_photo) {
        avatar = <Avatar src={friend.profile_photo} />;
      }
      return (
        <Card key={friend.id} zDepth={1}>
          <CardHeader
            title={ <Link to={`/view/${friend.id}`} onClick={() => this.props.getUserEvents(friend)}>{friend.fullname}</Link>}
            subtitle={friend.email}
            avatar={avatar}
            />
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

export default OtherFriends;
