import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import { logIn } from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
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
    browserHistory.push('/results');
  }

  onEmailChange(event) {
    this.setState({email: event.target.value})
    console.log('THIS IS THE EMAIL: ', this.state.user, "VALUE: ", event.target.value);
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value})
    console.log('THIS IS THE PASSWORD: ', this.state.user, "VALUE: ", event.target.value);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Card className="container">
            <form action="/" onSubmit={this.onSubmit}>
              <h2 className="card-heading">Login</h2>

              {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
              {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

              <div className="field-line">
                <TextField
                  floatingLabelText="Email"
                  name="email"
                  errorText={this.state.errors.email}
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
                  errorText={this.state.errors.password}
                  value={this.state.password}
                />
              </div>

              <div className="button-line">
                <RaisedButton type="submit" label="Log in" primary />
              </div>

              <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
            </form>
          </Card>
      </div>
    </MuiThemeProvider>
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logIn }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);
