import React from 'react';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../util/TextInput';
import { registerUser } from '../../actions/auth';
import SocialLogin from './SocialLogin';

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
})

const RegisterForm = ({ handleSubmit, registerUser, error, invalid, submitting }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(registerUser)}>
      <Segment>
        <Field
          name="displayName"
          type="text"
          component={TextInput}
          placeholder="Known As"
        />
        <Field
          name="email"
          type="text"
          component={TextInput}
          placeholder="Email Address"
        />
        <Field
          name="password"
          type="password"
          component={TextInput}
          placeholder="Password"
        />
        {error && <Label basic color="red">{error}</Label>}
        <Button disabled={invalid || submitting} fluid size="large" color="teal" content="Register" />
        <Divider horizontal>
          Or
        </Divider>
        <SocialLogin />
      </Segment>
    </Form>
  );
};

const actions = {
  registerUser
}

export default connect(null, actions)(reduxForm({ form: 'registerForm', validate })(RegisterForm));