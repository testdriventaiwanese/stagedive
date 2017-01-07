import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

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
    this.handleToggle = this.handleToggle.bind(this);
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

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const id = localStorage.getItem('id');
    return (
      <div>
        {Auth.isUserAuthenticated() ? (
          <Drawer
            open={this.state.open}
            style={{ backgroundColor: '#424242' }}>
            <MenuItem onTouchTap={this.handleToggle}>Back</MenuItem>
            <Link to={"/"} style={{ color: 'black' }}><MenuItem>Home</MenuItem></Link>
            <Link to={"account"} style={{ color: 'black' }}><MenuItem>My Account</MenuItem></Link>
            <Link to={"newsfeed"} style={{ color: 'black' }}><MenuItem>News Feed</MenuItem></Link>
            <Link to={"my-events"} style={{ color: 'black' }}><MenuItem>My Events</MenuItem></Link>
            <Link to={`journal/${id}`} style={{ color: 'black' }}><MenuItem>Concert Journal</MenuItem></Link>
            <Link to={"explore"} style={{ color: 'black' }}><MenuItem>Explore</MenuItem></Link>
          </Drawer>
        ) : (
          <Drawer
            open={this.state.open}
            style={{ backgroundColor: '#424242' }}>
            <MenuItem onTouchTap={this.handleToggle}>Back</MenuItem>
            <Link to={"login"} style={{ color: 'black' }}><MenuItem>Log In</MenuItem></Link>
            <Link to={"signup"} style={{ color: 'black' }}><MenuItem>Sign up</MenuItem></Link>
          </Drawer>
        )}
        <AppBar
          title="ConcertWallet"
          style={{backgroundColor: '#424242'}}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={Auth.isUserAuthenticated() ?
            //If logged in, show logout button
            <div>
              <SearchBar />
              <FlatButton onClick={this.onClickLogout} label="Logout" style={{ color: 'white' }} />
            </div> :
            //If not logged in, show login/signup
            <div>
              <FlatButton onClick={this.onClickLogin} label="Login" style={{ color: 'white' }} />
              <FlatButton onClick={this.onClickSignup} label="Signup" style={{ color: 'white' }} />
            </div>
          }
        />
      </div>
    );
  }
}

export default NavBar;
