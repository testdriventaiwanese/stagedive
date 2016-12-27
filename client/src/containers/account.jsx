import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo } from '../actions/index';

class Account extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  renderInfo() {
    if(this.props.info.length === 0){
      return <div>Loading...</div>
    }
    return (
      <div>
        <div>Username: {this.props.info[0].email}</div>
        <div>Name on account: {this.props.info[0].fullname}</div>
      </div>
    )
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
