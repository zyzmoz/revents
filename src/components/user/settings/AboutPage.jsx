import React from 'react';
import { Segment, Header, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import RadioInput from '../../util/RadioInput';
import TextArea from '../../util/TextArea';
import SelectInput from '../../util/SelectInput';
import TextInput from '../../util/TextInput';
import PlaceInput from '../../util/PlaceInput';

const interests = [
	{ key: 'drinks', text: 'Drinks', value: 'drinks' },
	{ key: 'culture', text: 'Culture', value: 'culture' },
	{ key: 'films', text: 'Films', value: 'film' },
	{ key: 'food', text: 'Food', value: 'food' },
	{ key: 'music', text: 'Music', value: 'music' },
	{ key: 'travel', text: 'Travel', value: 'travel' },
];

const AboutPage = ({pristine, submitting}) => {
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form>
        <label >Tell us about your status: </label>
        <Form.Group>
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="single"
            label="Single"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="relationship"
            label="Relationship"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="married"
            label="Married"
          />
        </Form.Group>
        <Divider />
        <label >Tell us about yourself</label>
        <Field
          name="about"
          component={TextArea}
          placeholder="About Me"
        />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Select your interests"
        />

        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="origin"
          options={{types: ['(regions)']}}
          component={PlaceInput}
          placeholder="Country of Origin"
        />
        <Divider/>
        <Button 
          disabled={pristine || submitting}
          size="large"
          positive
          content="Update Profile"
        />
      </Form>
    </Segment>
  )

}




export default reduxForm({form: 'about', enableReinitialize: true, destroyOnUnmount: true})(AboutPage);
