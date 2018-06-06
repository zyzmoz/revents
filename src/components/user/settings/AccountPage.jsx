import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired, matchesField, composeValidators } from 'revalidate'
import TextInput from '../../util/TextInput';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Enter a password' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Please confirm the password' }),
    matchesField('newPassword1')({ message: 'Password don\'t match' })
  )()
})

const AccountPage = ({ error, invalid, submitting, handleSubmit, updatePassword, providerId }) =>  
  (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId && providerId === 'password' &&
      <div>
        <Header color="teal" sub content="Change Password" />
        <p>Use this form to update your accont setting</p>
        <Form onSubmit={handleSubmit(updatePassword)}>
          <Field
            width={8}
            name="newPassword1"
            type="password"
            pointing="left"
            inLine={true}
            component={TextInput}
            placeholder="New Password"
          />
          <Field
            width={8}
            name="newPassword2"
            type="password"
            pointing="left"
            inLine={true}
            component={TextInput}
            placeholder="New Password"
          />
          <Divider />
          <Button disabled={invalid || submitting} size="large" positive content="Update Password" />
        </Form>
      </div>}
      {providerId && providerId === 'facebook.com' &&
      <div>
        <Header color="teal" sub content="Facebook Account" />
        <p>Please visit facebook to update your account settings</p>
        <Button type="button" color="facebook">
          <Icon name="facebook" />
          Go to Facebook
        </Button>
      </div>}
      {providerId && providerId === 'google.com' &&
      <div>
        <Header color="teal" sub content="Google Account" />
        <p>Please visit facebook to update your account settings</p>
        <Button type="button" color="google plus">
          <Icon name="google plus" />
          Go to Google
        </Button>
      </div>}

    </Segment>
  )



export default reduxForm({ form: 'account', validate })(AccountPage);
