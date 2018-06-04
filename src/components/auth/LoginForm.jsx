import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import TextInput from '../util/TextInput';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login, socialLogin } from '../../actions/auth';
import SocialLogin from './SocialLogin';

const LoginForm = ({ login, handleSubmit, error, socialLogin }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="Password"
        />
        {error && <Label basic color="red">{error}</Label>}
        <Button fluid size="large" color="teal" content="Login" />
        <Divider horizontal>
          Or
        </Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>

  );
};

const actions = {
  login,
  socialLogin
}

export default connect(null, actions)(reduxForm({ form: 'loginForm' })(LoginForm));