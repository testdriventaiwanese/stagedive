import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class Token extends Component {
  componentDidMount() {
    const token = window.location.hash.slice(8);
    localStorage.setItem('token', token);
    hashHistory.push('/');
  }

  render() {
    return (
      <div>token</div>
    )
  }
}

export default Token;
