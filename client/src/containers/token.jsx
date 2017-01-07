import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class Token extends Component {
  componentWillMount() {
    // const token = window.location.hash.slice(8, 148);
    // const userId = window.location.hash.slice(148);
    console.log('window location: ', window.location);
    localStorage.setItem('token', window.location.hash.slice(8, 148));
    localStorage.setItem('id', window.location.hash.slice(148));
    // hashHistory.push('/');
  }
  componentDidMount() {
    // const token = window.location.hash.slice(8, 148);
    // const userId = window.location.hash.slice(148);
    console.log('window location: ', window.location);
    localStorage.setItem('token', window.location.hash.slice(8, 148));
    localStorage.setItem('id', window.location.hash.slice(148));
    hashHistory.push('/');
  }

  render() {
    return (
      <div>token</div>
    );
  }
}

export default Token;
