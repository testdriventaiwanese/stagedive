import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Avatar from 'material-ui/Avatar';

import { getUserInfo } from '../actions/index';
import Auth from '../modules/auth';


class Account extends Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
  }
  componentDidMount() {
    this.props.getUserInfo();
  }

  renderInfo() {
    if (this.props.info.length === 0) {
      return (
        <div align='center'>
          <LinearProgress mode="indeterminate" />
        </div>
      );
    }
    const userInfo = this.props.info[0];
    let avatar = <Avatar>{userInfo.fullname.slice(0, 1)}</Avatar>;
    if (userInfo.profile_photo) {
      avatar = <Avatar src={userInfo.profile_photo} />;
    }
    return (
      <Card>
        <CardHeader
          title={<h3>{userInfo.fullname}</h3>}
          avatar={avatar}
        />
        <CardText>
          <div><strong>Member Since: </strong>{userInfo.createdOn.slice(0,10)}</div>
          <div><strong>Username: </strong>{userInfo.email}</div>
          <div><strong>Fullname on account: </strong>{userInfo.fullname}</div>
        </CardText>
      </Card>
    );
  }

  render() {
    return (
      <div>
        <h3>Your Account</h3>
        <a href='#'>Click here to change password</a>
        <div>{this.renderInfo()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Account);
