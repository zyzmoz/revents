import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import TextInput from '../util/TextInput';
import { Field, reduxForm } from 'redux-form';

const LoginForm = () => {
  return (
    <Form error size="large">
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
        <Button fluid size="large" color="teal" content="Login"/>
      </Segment>
    </Form>
    
  );
};

export default reduxForm({form: 'loginForm'})(LoginForm);