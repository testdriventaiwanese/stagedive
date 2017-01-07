import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
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
      return <div>Loading...</div>
    }
    return (
      <div>
        <div>Member Since: {this.props.info[0].createdOn.slice(0,10)}</div>
        <div>Username: {this.props.info[0].email}</div>
        <div>Name on account: {this.props.info[0].fullname}</div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3>Your Account</h3>
        <div>Click here to change password</div>
        <div>User account information below...</div>
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
