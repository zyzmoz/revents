import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
	render() {
		return (
			<Segment>
				<Form>
					<Form.Field>
						<label>Event Title</label>
						<input type="text" placeholder="Event"/>
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input type="date" />
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input type="text" placeholder="City event is taking place"/>
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input type="text" placeholder="Enter the venue of the event"/>
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input type="text" placeholder="Enter the host name"/>
					</Form.Field>
					<Button positive type="submit">
						Submit
					</Button>
					<Button type="button">Cancel</Button>
				</Form>
			</Segment>
		);
	}
}

export default EventForm;