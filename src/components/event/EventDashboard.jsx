import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";;
import {
	createEvent,
	updateEvent,
	deleteEvent
} from '../../actions/event';

import LoadingComponent from '../util/LoadingComponent';
import EventActivity from './EventActivity';

class EventDashboard extends Component {

	handleDeleteEvent = (eventId) => () => {
		this.props.deleteEvent(eventId);
	}

	render() {
		const { events } = this.props;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList deleteEvent={this.handleDeleteEvent} events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}
const mapState = (state) => ({
	events: state.firestore.ordered.events 
});

const actions = {
	createEvent,
	updateEvent,
	deleteEvent
};

export default connect(mapState, actions)(firestoreConnect([{ collection: 'events' }])(EventDashboard));