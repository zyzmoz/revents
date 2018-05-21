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
			isOpen: false
		}
	}

	handleFormOpen = () => {
		this.setState({
			isOpen: true
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
			isOpen: false
		});
	}

	render() {
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={this.state.events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<Button onClick={this.handleFormOpen} positive>Create Event</Button>
					{this.state.isOpen &&
						<EventForm 
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