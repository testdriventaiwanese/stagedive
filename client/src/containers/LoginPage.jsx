import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { logIn } from '../actions/index';

class LoginPage extends Component {
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
    return (
      <Card style={{textAlign:'center'}}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h2 className="card-heading">LogIn</h2>
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
            Don&apos;t have an account?<Link to={'signup'}> Create one</Link>. Or login with <a href='/auth/facebook'>Facebook</a>.
          </CardText>
        </form>
      </Card>
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
