import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Explore from 'material-ui/svg-icons/action/explore';
import Home from 'material-ui/svg-icons/action/home';
import Apps from 'material-ui/svg-icons/navigation/apps';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Info from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
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
    const id = localStorage.getItem('id');
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
    };
    return (
      <div>
        {Auth.isUserAuthenticated() ? (
          <Drawer
            className="drawer-style"
            width={180}
            docked={false}
            open={this.state.open}
            zDepth={1}
            onRequestChange={(open) => this.setState({open})}>
            <MenuItem className="app-bar-height"></MenuItem>
              <Link to={"/"} onClick={this.handleLeftNavToggle}><MenuItem primaryText='Home' rightIcon={<Home />} /></Link>
              <Link to={`journal/${id}`} onClick={this.handleLeftNavToggle}><MenuItem primaryText='Concert Journal' rightIcon={<Apps />} /></Link>
              <Link to={"explore"} onClick={this.handleLeftNavToggle}><MenuItem primaryText="Explore" rightIcon={<Explore />} /></Link>
            <Divider />
            <Paper className="bottom-left-nav-style" zDepth={1}>
              <Link to={"account"}><MenuItem onClick={this.handleLeftNavToggle} primaryText="Account" rightIcon={<AccountCircle />} /></Link>
              <MenuItem onClick={this.onClickLogout} primaryText="Sign out" rightIcon={<PowerSetting />} />
              <Link to={"about"} style={{color: 'black'}}><MenuItem onClick={this.handleLeftNavToggle} primaryText="About Us" rightIcon={<Info />}/></Link>
            </Paper>
          </Drawer>
        ) : (
          <Drawer
            className="drawer-style"
            docked={false}
            width={150}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <MenuItem className="app-bar-height"></MenuItem>
            <Link to={"login"} onTouchTap={this.handleLeftNavToggle}><MenuItem>Log In</MenuItem></Link>
            <Link to={"signup"} onTouchTap={this.handleLeftNavToggle}><MenuItem>Sign up</MenuItem></Link>
          </Drawer>
        )}
        <div className="div-bar-style">
          <AppBar
            title="StageDive"
            style={appBarStyle}
            titleStyle={{ color: 'black', fontFamily: 'Oleo Script, cursive', fontSize: '30px' }}
            onLeftIconButtonTouchTap={this.handleLeftNavToggle}
            iconStyleLeft={{ backgroundColor: '#505050', position: 'relative', zIndex: 10000 }}
          >
            <div className="search-bar-style">
              <a href='https://github.com/testdriventaiwanese/stagedive' className="github-link"><FontIcon className='fa fa-github' primary /></a>
              {Auth.isUserAuthenticated() ? (
                <SearchBar />
              ) : (
                <div />
              )}
            </div>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default NavBar;
