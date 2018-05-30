import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../util/TextInput';

const RegisterForm = () => {
  return (
    <Form size="large">
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
        <Button fluid size="large" color="teal" content="Register"/>
      </Segment>
    </Form>
  );
};

export default reduxForm({form: 'registerForm'})(RegisterForm);