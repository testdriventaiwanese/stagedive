import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { hashHistory } from 'react-router';
import AppBar from '../containers/app-bar';
import Auth from '../modules/auth';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
  }

  render() {
    return (
      <MuiThemeProvider>
          <div>
            <AppBar />
            {this.props.children}
          </div>
      </MuiThemeProvider>
    );
  }
}
