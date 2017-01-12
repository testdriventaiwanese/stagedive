import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AccountMenu from 'material-ui/svg-icons/navigation/expand-more';
import LeftNavMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

import Auth from '../modules/auth';
import SearchBar from './searchbar';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      open: false,
    };
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickSignup = this.onClickSignup.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
    this.handleLeftNavToggle = this.handleLeftNavToggle.bind(this);
  }

  onClickLogin(event) {
    hashHistory.push('/login');
  }
  onClickSignup(event) {
    hashHistory.push('/signup');
  }
  onClickLogout(event) {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    hashHistory.push('/login');
  }

  handleLeftNavToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const appBarHeight = '70px';
    const id = localStorage.getItem('id');
    const divBarStyle = {
      width: 'inherit',
      height: appBarHeight,
    }
    const appBarStyle = {
      // display: 'flex',
      // flexDirection: 'row',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '9999',
      width: '100%',
      height: 'inherit',
      backgroundColor: 'white',

    }
    const searchBarStyle = {
      marginRight: '33%',
    }
    const drawerStyle = {
      top: '200px',
      position: 'relative',
    }
    const bottomLeftNavStyle = {
      position: 'absolute',
      width: '100%',
      bottom: '0',
    }
    return (
      <div>
        {Auth.isUserAuthenticated() ? (
          <Drawer
            style={drawerStyle}
            width={150}
            docked={false}
            open={this.state.open}
            zDepth={1}
            onRequestChange={(open) => this.setState({open})}>
            <MenuItem style={{height: appBarHeight}}></MenuItem>
            <Link to={"/"} style={{ color: 'black' }} onClick={this.handleLeftNavToggle}><MenuItem>Home</MenuItem></Link>
            <Link to={`journal/${id}`} style={{ color: 'black' }} onClick={this.handleLeftNavToggle}><MenuItem>Concert Journal</MenuItem></Link>
            <Link to={"explore"} style={{ color: 'black' }} onClick={this.handleLeftNavToggle}><MenuItem>Explore</MenuItem></Link>
            <Paper style={bottomLeftNavStyle} zDepth={1}>
              <Link to={"account"} style={{ color: 'black' }}><MenuItem primaryText="My Account" /></Link>
              <MenuItem onClick={this.onClickLogout} primaryText="Sign out" />
            </Paper>
          </Drawer>
        ) : (
          <Drawer
            style={drawerStyle}
            docked={false}
            width={150}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <MenuItem style={{height: appBarHeight}}></MenuItem>
            <Link to={"login"} style={{ color: 'black' }}><MenuItem>Log In</MenuItem></Link>
            <Link to={"signup"} style={{ color: 'black' }}><MenuItem>Sign up</MenuItem></Link>
          </Drawer>
        )}
        <div style={divBarStyle}>
          <AppBar
            title="ConcertWallet"
            style={appBarStyle}
            titleStyle={{ color: 'black', fontFamily: 'Oleo Script, cursive', fontSize: '30px' }}
            onLeftIconButtonTouchTap={this.handleLeftNavToggle}
            iconStyleLeft={{backgroundColor: 'black'}}
            >
            <div style={searchBarStyle}>
              <SearchBar />
            </div>
            {Auth.isUserAuthenticated() ?
              //If logged in, show logout button
              <div>
                <IconMenu
                  style={{top:'10px'}}
                  iconButtonElement={<IconButton><AccountMenu /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <Link to={"account"} style={{ color: 'black' }}>
                    <MenuItem primaryText="My Account" />
                  </Link>
                  <MenuItem onClick={this.onClickLogout} primaryText="Sign out" />
                </IconMenu>
              </div> :
              //If not logged in, show login/signup
              <div>
                <FlatButton onClick={this.onClickLogin} label="Login" style={{ color: 'black' }} />
                <FlatButton onClick={this.onClickSignup} label="Signup" style={{ color: 'black' }} />
              </div>
            }
          </AppBar>
        </div>
      </div>
    );
  }
}

export default NavBar;
