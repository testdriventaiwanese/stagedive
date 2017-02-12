import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SignUpPage from './SignUpPage';
import { logIn } from '../actions/index';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  onSubmit = (inputs) => {
    this.props.logIn(inputs);
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const backgroundStyle = {
      backgroundImage: 'url(http://i.imgur.com/JI5phSv.jpg)',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      position: 'fixed',
      opacity: '.9',
      top: '0',
      left: '0',
      right: '0',
    }
    const opacityNum = .97;
    const loginBox = {
      width: '35%',
      height: '50%',
      position: 'absolute',
      top:'0',
      bottom: '0',
      left: '0',
      right: '0',
      margin: 'auto',
      opacity: opacityNum,
    }
    const tabStyle = {
      backgroundColor: '#FAFAFA',
      color: 'black',
      // opacity: opacityNum,
    }
    const boxOpacity = {
      // opacity: opacityNum,
    }
    return (
      <div style={backgroundStyle}>
        <Tabs
          inkBarStyle={boxOpacity}
          style={loginBox}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Login" value="a" style={tabStyle}>
            <Card style={{ textAlign: 'center'}}>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="field-line">
                  <Field name="email" type="text" component={this.renderTextField} label="Email" />
                </div>
                <div className="field-line">
                  <Field name="password" type="password" component={this.renderTextField} label="Password" />
                </div>
                <div className="button-line">
                  <RaisedButton type="submit" label="Log in" disabled={pristine || submitting} primary />
                </div>
                <CardText>
                  <span>Or login with    </span>
                  <a href='/auth/facebook'>
                    <FontIcon className='fa fa-facebook-official fa-3x' primary />
                  </a>
                </CardText>
              </form>
            </Card>
          </Tab>
          <Tab label="Sign Up" value="b" style={tabStyle}>
            <SignUpPage />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const requiredFields = ['email', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

LoginPage = reduxForm({
  form: 'LoginPage',
  validate,
})(LoginPage);

export default connect(null, { logIn })(LoginPage);
