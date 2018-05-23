import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import imageSrc from '../../assets/img/react.png';
import {
	createEvent,
	updateEvent

} from '../../actions/event';


class EventForm extends Component {

	state = {
		event: Object.assign({}, this.props.event)
	}


	// componentDidMount() {
	// 	const { selectedEvent } = this.props;
	// 	if (selectedEvent !== null) {
	// 		this.setState({
	// 			event: selectedEvent
	// 		});
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
	// 	//Check if there is different props, if so update 
	// 	if (nextProps.selectedEvent !== this.props.selectedEvent) {
	// 		this.setState({
	// 			event: nextProps.selectedEvent || emptyEvent
	// 		})
	// 	}

	// }

	onFormSubmit = (evt) => {
		evt.preventDefault();
		if (this.state.event.id) {
			this.props.updateEvent(this.state.event);
			this.props.history.goBack();
		} else {
			const uid =Math.floor(Math.random() * Math.floor(1000)).toString();
			const newEvent = {
				...this.state.event,
				id: uid,
				hostPhotoURL: imageSrc,
				attendees: [
					{	
						id: uid,
						name: this.state.event.hostedBy,
						photoURL: imageSrc,
						isHost: true
					}
				]
			}
			this.props.createEvent(newEvent);
			this.props.history.push('/events');
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
					<Button onClick={() => this.props.history.goBack} type="button">Cancel</Button>
				</Form>
			</Segment>
		);
	}
}

const mapState = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event = {
		title: '',
		date: '',
		city: '',
		venue: '',
		hostedBy: ''
	}

	if (eventId && state.events.length > 0){		
		//For a single  event remember to add the index = 0 a.k.a "[0]"
		event = state.events.filter(event => event.id === eventId)[0];
	}

	return {
		event
	}
}

const actions = {
	createEvent,
	updateEvent
}

export default connect(mapState, actions)(EventForm);