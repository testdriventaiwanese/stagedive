import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '../containers/app-bar';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {

  render() {
    let background = {
      background: '#FAFAFA',
      top: '0',
      left: '0',
      right: '0',
    }
    return (
      <MuiThemeProvider>
        <div style={background}>
          <div>
            <AppBar />
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
