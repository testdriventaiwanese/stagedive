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

import SearchBar from './searchbar';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo, logoutUser } from '../actions/index';
import { Link } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      open: false,
    };
    this.checkLogged = this.checkLogged.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickSignup = this.onClickSignup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    this.props.getUserInfo()
    .then((res) => {
      this.checkLogged();
    });
  }

  checkLogged () {
    if (this.props.info.length === 0) {
      this.setState({ logged: false });
    } else {
      this.setState({ logged: true });
    }
  }

  onClickLogin(event) {
    hashHistory.push('/login');
  }
  onClickSignup(event) {
    hashHistory.push('/signup');
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.state.open}
          style={{ backgroundColor: '#424242' }}>
          <MenuItem onTouchTap={this.handleToggle}>Back</MenuItem>
          <Link to={"/"} style={{ color: 'black' }}><MenuItem>Home</MenuItem></Link>
          <Link to={"account"} style={{ color: 'black' }}><MenuItem>My Account</MenuItem></Link>
          <Link to={"my-events"} style={{ color: 'black' }}><MenuItem>My Events</MenuItem></Link>
          <Link to={"journal"} style={{ color: 'black' }}><MenuItem>Concert Journal</MenuItem></Link>
          <Link to={"explore"} style={{ color: 'black' }}><MenuItem>Explore</MenuItem></Link>
        </Drawer>
        <AppBar
          title="ConcertWallet"
          style={{backgroundColor: '#424242'}}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={this.state.logged ?
            //If logged in, show logout button
            <div>
              <SearchBar />
              <FlatButton onClick={() => this.props.logoutUser()} label="Logout" style={{ color: 'white' }} />
            </div> :
            //If not logged in, show login/signup
            <div>
                <SearchBar />
                <FlatButton onClick={this.onClickLogin} label="Login" style={{ color: 'white' }} />
                <FlatButton onClick={this.onClickSignup} label="Signup" style={{ color: 'white' }} />
            </div>
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.getUserInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfo, logoutUser }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

//Might need below for modularize/code cleanup
// class Login extends Component {
//   static muiName = 'FlatButton';
//
//   render() {
//     return (
//       <div>
//         <FlatButton {...this.props} label="Login" />
//         <FlatButton {...this.props} label="Signup" />
//
//       </div>
//     );
//   }
// }

// class Logout extends Component {
//   static muiName = 'FlatButton';
//
//   render() {
//     return (
//       <FlatButton onClick={() => this.props.logoutUser()} label="Logout" />
//     );
//   }
// }
