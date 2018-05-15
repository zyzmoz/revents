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
	render() {
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<Button positive>Create Event</Button>
					<EventForm />
				</Grid.Column>
			</Grid>
		);
	}
}

export default EventDashboard;