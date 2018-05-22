import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const emptyEvent = {
	title: '',
	date: '',
	city: '',
	venue: '',
	hostedBy: ''
}

class EventForm extends Component {

	state = {
		event: emptyEvent
	}


	componentDidMount() {
		const { selectedEvent } = this.props;
		if (selectedEvent !== null) {
			this.setState({
				event: selectedEvent
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		//Check if there is different props, if so update 
		if (nextProps.selectedEvent !== this.props.selectedEvent) {
			this.setState({
				event: nextProps.selectedEvent || emptyEvent
			})
		}

	}

	onFormSubmit = (evt) => {
		evt.preventDefault();
		if (this.state.event.id) {
			this.props.updateEvent(this.state.event);
		} else {
			this.props.createEvent(this.state.event);
		}
	}

	onInputChange = (evt) => {
		const newEvent = this.state.event;
		newEvent[evt.target.name] = evt.target.value;
		this.setState({ event: newEvent })
	}

	render() {
		const { handleCancel } = this.props;
		return (
			<Segment>
				<Form onSubmit={this.onFormSubmit}>
					<Form.Field>
						<label>Event Title</label>
						<input name="title" value={this.state.event.title} onChange={e => this.onInputChange(e)} type="text" placeholder="Event Title" />
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input name="date" value={this.state.event.date} onChange={e => this.onInputChange(e)} type="date" />
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input name="city" value={this.state.event.city} onChange={e => this.onInputChange(e)} type="text" placeholder="City event is taking place" />
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input name="venue" value={this.state.event.venue} onChange={e => this.onInputChange(e)} type="text" placeholder="Enter the venue of the event" />
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input name="hostedBy" value={this.state.event.hostedBy} onChange={e => this.onInputChange(e)} type="text" placeholder="Enter the host name" />
					</Form.Field>
					<Button positive type="submit">
						Submit
					</Button>
					<Button onClick={() => handleCancel()} type="button">Cancel</Button>
				</Form>
			</Segment>
		);
	}
}

export default EventForm;