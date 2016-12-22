import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { signUp } from '../actions/index'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      email: '',
      name: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(event) {
    let resultObj = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    }
    event.preventDefault();
    this.props.signUp(resultObj)
  }

  onNameChange(event) {
    this.setState({name: event.target.value})
    console.log('THIS IS THE USERNAME: ', this.state.user, "VALUE: ", event.target.value);
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
          <form onSubmit={this.onSubmit}>
            <h2 className="card-heading">Sign Up</h2>

            {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

            <div className="field-line">
              <TextField
                floatingLabelText="Name"
                name="name"
                type="text"
                errorText={this.state.errors.name}
                onChange={this.onNameChange}
                value={this.state.name}
              />
            </div>

            <div className="field-line">
              <TextField
                floatingLabelText="Email"
                type="text"
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
              <RaisedButton type="submit" label="Create New Account" primary />
            </div>

            <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
          </form>
        </Card>
      </div>
    </MuiThemeProvider>
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUpPage);
