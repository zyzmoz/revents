import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import { connect } from 'react-redux';
import {
	createEvent,
	updateEvent,
	deleteEvent
} from '../../actions/event';

class EventDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			selectedEvent : null
		}
	}

	handleFormOpen = () => {
		this.setState({
			isOpen: true,
			selectedEvent: null
		});
	}

	handleCancel = () => {
		this.setState({
			isOpen: false
		});
	}

	handleCreateEvent = (newEvent) => {
		newEvent.id = Math.floor(Math.random() * 1000);
		newEvent.hostPhotoURL = 'https://randomuser.me/api/portraits/men/7.jpg';
		newEvent.attendees = [];
		const updatedEvents = [...this.state.events, newEvent];
		console.log(updatedEvents);		
		this.setState({
			events: updatedEvents,
			isOpen: false,
			selectedEvent: null
		});
	}

	handleUpdateEvent = (updatedEvent) => {
		this.setState({
			events: this.state.events.map(event => {
				if (event.id === updatedEvent.id) {
					//It will copy updatedEvent to a new empty object 
					return  Object.assign({}, updatedEvent);
				} else {
					return event;
				}
			}),
			isOpen: false,
			selectedEvent: null
		})
	}

	handleOpenEvent = (eventToOpen) => () => {
		this.setState({
			selectedEvent: eventToOpen,
			isOpen: true 
		})		
	}	

	handleDeleteEvent = (eventId) => () => {
		this.props.deleteEvent(eventId);
	}

	render() {
		const { selectedEvent } = this.state;
		const { events } = this.props;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<Button onClick={this.handleFormOpen} positive>Create Event</Button>
					{this.state.isOpen &&
						<EventForm 
							selectedEvent={selectedEvent}
							updateEvent={this.handleUpdateEvent}
							handleCancel={this.handleCancel} 
							createEvent={this.handleCreateEvent}
						/>
					}
				</Grid.Column>
			</Grid>
		);
	}
}
const mapState = (state) => ({
	events: state.events
});

const actions = {
	createEvent,
	updateEvent,
	deleteEvent
};

export default connect(mapState, actions)(EventDashboard);