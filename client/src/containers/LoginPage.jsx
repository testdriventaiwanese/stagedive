import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Auth from '../modules/auth';
import { logIn, redirectFacebookClick } from '../actions/index'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(event) {
    let resultObj = {
      email: this.state.email,
      password: this.state.password,
    }
    event.preventDefault();
    this.props.logIn(resultObj)
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Card className="container">
            <form action="/" onSubmit={this.onSubmit}>
              <h2 className="card-heading">Login</h2>
              <div className="field-line">
                <TextField
                  floatingLabelText="Email"
                  name="email"
                  onChange={this.onEmailChange}
                  value={this.state.email}
                />
              </div>

              <div className="field-line">
                <TextField
                  floatingLabelText="Password"
                  type="password"
                  name="password"
                  onChange={this.onPasswordChange}
                  value={this.state.password}
                />
              </div>

              <div className="button-line">
                <RaisedButton type="submit" label="Log in" primary />
              </div>

              <a href="/auth/facebook">
                <RaisedButton label='Facebook' onClick={() => this.props.redirectFacebookClick()} primary />
              </a>


              <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
            </form>
          </Card>
      </div>
    </MuiThemeProvider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logIn, redirectFacebookClick }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);
