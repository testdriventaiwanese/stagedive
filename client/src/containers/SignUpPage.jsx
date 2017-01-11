import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { signUp } from '../actions/index'

class SignUpPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  onSubmit = (inputs) => {
    console.log('inputs on singup: ', inputs);
    this.props.signUp(inputs)
  }

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  render() {
     const { handleSubmit, pristine, submitting } = this.props;

     return (
       <Card style={{textAlign:'center'}}>
         <form onSubmit={handleSubmit(this.onSubmit)}>
           <h2 className="card-heading">Sign Up</h2>
           <div className="field-line">
             <Field name="name" type="text" component={this.renderTextField} label="Name" />
           </div>
           <div className="field-line">
             <Field name="email" type="text" component={this.renderTextField} label="Email" />
           </div>
           <div className="field-line">
             <Field name="password" type="password" component={this.renderTextField} label="Password" />
           </div>
           <div className="button-line">
             <RaisedButton type="submit" label="Create New Account" disabled={pristine || submitting} primary />
           </div>
           <CardText>
             Already have an account? <Link to={'/login'}>Log in</Link>. Or login with <a href='/auth/facebook'>Facebook</a>.
           </CardText>
         </form>
       </Card>
     );
   }
 }

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name', 'email', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

SignUpPage = reduxForm({
  form: 'SignUpPage',
  validate,
})(SignUpPage);

export default connect(null, { signUp })(SignUpPage);
