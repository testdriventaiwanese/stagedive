import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';
import Auth from '../modules/Auth';

class Logout extends Component {
  logout() {
    console.log('logout');
    localStorage.removeItem('token')
  }

  render() {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Logout);
