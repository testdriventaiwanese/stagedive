import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class Token extends Component {
  componentWillMount() {
    const tokenArr = window.location.hash.slice(8).split('%20');
    localStorage.setItem('token', tokenArr[0]);
    localStorage.setItem('id', tokenArr[1]);
    hashHistory.push('/');
  }

  render() {
    return (
      <div>token</div>
    );
  }
}

export default Token;
