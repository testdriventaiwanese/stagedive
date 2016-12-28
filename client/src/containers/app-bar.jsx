import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import SearchBar from './searchbar';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfo, logoutUser } from '../actions/index';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
    this.checkLogged = this.checkLogged.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickSignup = this.onClickSignup.bind(this);
  }

  componentWillMount() {
    this.props.getUserInfo()
    .then((res) => {
      this.checkLogged();
    })
  }

  checkLogged () {
    if(this.props.info.length === 0) {
      this.setState({logged: false});
    }
    else{
      this.setState({logged: true});
    }
  };

  onClickLogin(event) {
    browserHistory.push('/login');
  }
  onClickSignup(event) {
    browserHistory.push('/signup');
  }

  render() {
    return (
      <div>
        <AppBar
          title="ConcertWallet"
          style={{backgroundColor: '#424242'}}

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
