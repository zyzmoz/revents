import React, { Component } from 'react';
import { Segment, Header, Form, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import DateInput from '../../util/DateInput';
import PlaceInput from '../../util/PlaceInput';
import TextInput from '../../util/TextInput';
import RadioInput from '../../util/RadioInput';
import moment from 'moment';

class BasicsPage extends Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    console.log(this.props);
    return (
      <Segment>
        <Header dividing size="large" content="Basics" />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Form.Group inline>
            <label >Gender: </label>
            <Field
              name="gender"
              type="radio"
              value="male"
              label="Male"
              component={RadioInput}
            />
            <Field
              name="gender"
              type="radio"
              value="female"
              label="Female"
              component={RadioInput}
            />
          </Form.Group>
          <Field
            width={8}
            name="dateOfBirth"
            component={DateInput}
            placeholder="Date of Birth"
            dateFormat="YYYY-MM-DD"
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode="select"
            maxDate={moment().subtract(18, 'years')}

          />
          <Field
            width={8}
            name="city"
            placeholder="Home Town"
            options={{ types: ['(cities)'] }}
            label="City"
            component={PlaceInput}
          />
          <Divider />
          <Button
            
            disabled={pristine || submitting}
            size="large"
            positive
            content="Update Profile"
          />
        </Form>


      </Segment>

    );
  }
}

export default reduxForm({ form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })(BasicsPage);
