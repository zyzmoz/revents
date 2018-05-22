import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';

const events = [
	{
		id: '1',
		title: 'Trip to Tower of London',
		date: "2018-09-18",
		category: 'culture',
		description: 'Hello UK',
		city: 'London, UK',
		venue: "Tower",
		hostedBy: "Bob",
		hostPhotoURL: 'https://randomuser.me/api/portraits/men/21.jpg',
		attendees: [
			{
				id: 'a',
				name: "Bob",
				photoURL: 'https://randomuser.me/api/portraits/men/21.jpg'
			},
			{
				id: 'b',
				name: "Tom",
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
			}
		]
	}
];

class EventDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: events,
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
		const updatedEvents = this.state.events.filter( e => e.id !== eventId);
		this.setState({
			events: updatedEvents
		});
	}

	render() {
		const { selectedEvent } = this.state;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} events={this.state.events} />
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

export default EventDashboard;