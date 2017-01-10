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

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import Auth from '../modules/auth';
import SearchBar from './searchbar';

class FriendBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      open: false,
    };
    this.handleRightNavToggle = this.handleRightNavToggle.bind(this);
  }

  handleRightNavToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const id = localStorage.getItem('id');

    return (
      <div>
        {Auth.isUserAuthenticated() ? (
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <MenuItem onTouchTap={this.handleRightNavToggle}>Back</MenuItem>
            <Link to={"/"} style={{ color: 'black' }}><MenuItem>Home</MenuItem></Link>
            <Link to={"account"} style={{ color: 'black' }}><MenuItem>My Account</MenuItem></Link>
            <Link to={"newsfeed"} style={{ color: 'black' }}><MenuItem>News Feed</MenuItem></Link>
            <Link to={"my-events"} style={{ color: 'black' }}><MenuItem>My Events</MenuItem></Link>
            <Link to={`journal/${id}`} style={{ color: 'black' }}><MenuItem>Concert Journal</MenuItem></Link>
            <Link to={"explore"} style={{ color: 'black' }}><MenuItem>Explore</MenuItem></Link>
          </Drawer>
        ) : (
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <MenuItem onTouchTap={this.handleRightNavToggle}>Back</MenuItem>
            <Link to={"login"} style={{ color: 'black' }}><MenuItem>Log In</MenuItem></Link>
            <Link to={"signup"} style={{ color: 'black' }}><MenuItem>Sign up</MenuItem></Link>
          </Drawer>
        )}
      </div>
    );
  }
}

export default FriendBar;
