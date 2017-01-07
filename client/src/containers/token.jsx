import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class Token extends Component {
  componentWillMount() {
    const token = window.location.hash.slice(8, 148);
    const userId = window.location.hash.slice(148);
    localStorage.setItem('token', token);
    localStorage.setItem('id', userId);
    hashHistory.push('/');
  }

  render() {
    return (
      <div>token</div>
    );
  }
}

export default Token;
