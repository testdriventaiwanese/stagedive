import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Splash extends Component {
  render() {
    const backgroundStyle = {
      backgroundImage: 'url(http://i.imgur.com/073dXGa.jpg)',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      position: 'fixed',
      opacity: '.9',
      top: '0',
      left: '0',
      right: '0',
    }
    return (
      <div style={backgroundStyle}>
        <h1>HELLO TEST</h1>
      </div>
    );
  }
}
