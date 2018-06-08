import React, { Component } from 'react';
import { Segment, Form, Button, Header, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import imageSrc from '../../assets/img/react.png';
import {
	createEvent,
	updateEvent,
	cancelToggle

} from '../../actions/event';
import Script from 'react-load-script';
import { withFirestore } from 'react-redux-firebase';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';

import TextInput from '../util/TextInput';
import TextArea from '../util/TextArea';
import SelectInput from '../util/SelectInput';
import DateInput from '../util/DateInput';
import PlaceIput from '../util/PlaceInput';

const category = [
	{ key: 'drinks', text: 'Drinks', value: 'drinks' },
	{ key: 'culture', text: 'Culture', value: 'culture' },
	{ key: 'films', text: 'Films', value: 'film' },
	{ key: 'food', text: 'Food', value: 'food' },
	{ key: 'music', text: 'Music', value: 'music' },
	{ key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
	title: isRequired({ message: 'The event title is required' }),
	category: isRequired({ message: 'Please provide a category' }),
	description: composeValidators(
		isRequired({ message: 'Please enter a description' }),
		hasLengthGreaterThan(4)({ message: 'Description must have more than 5 characters' })
	)(),
	city: isRequired('city'),
	venue: isRequired('venue'),
	date: isRequired('date')
})
//
class EventForm extends Component {

	state = {
		cityLatLng: {},
		venueLatLng: {},
		scriptLoaded: false

	}

	async componentDidMount() {
		const { firestore, match } = this.props;
		await firestore.setListener(`events/${match.params.id}`);
		

	}

	handleCitySelect = (selectedCity) => {
		geocodeByAddress(selectedCity)
			.then(results => getLatLng(results[0]))
			.then(latlng => this.setState({ cityLatLng: latlng }))
			.then(() => {
				this.props.change('city', selectedCity);
			});
	}

	handleVenueSelect = (selectedVenue) => {
		geocodeByAddress(selectedVenue)
			.then(results => getLatLng(results[0]))
			.then(latlng => this.setState({ venueLatLng: latlng }))
			.then(() => {
				this.props.change('venue', selectedVenue);
			});
	}


	onFormSubmit = (values) => {
		values.venueLatLng = this.state.venueLatLng;
		if (values.id) {
			if (Object.keys(values.venueLatLng).length === 0) {
				values.venueLatLng = this.props.event.venueLatLng;
			}
			this.props.updateEvent(values);
			this.props.history.goBack();
		} else {
			this.props.createEvent(values);
			this.props.history.push('/events');
		}
	}

	handleScriptLoad = () => this.setState({ scriptLoaded: true });

	render() {
		const { invalid, submitting, pristine, event, cancelToggle } = this.props;
		return (
			<Grid.Column width={10}>
				<Script
					url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_nTjtxOtSO3_2CnYrP3Xurrb16FoJ-RA&libraries=places"
					onLoad={this.handleScriptLoad}
				/>
				<Segment>
					<Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
						<Header sub color="teal" content="Event Details" />
						<Field name="title" type="text" component={TextInput} placeholder="Give a name to your event" />
						<Field name="category"
							type="text"
							component={SelectInput}
							placeholder="What's your event about "
							options={category}
							multiple={false}

						/>
						<Field name="description" type="text" component={TextArea} rows={3} placeholder="Tell us about your event" />

						<Header sub color="teal" content="Event Location Details" />
						<Field
							name="city"
							type="text"
							component={PlaceIput}
							options={{ types: ['(cities)'] }}
							placeholder="Event City"
							onSelect={this.handleCitySelect}

						/>
						{this.state.scriptLoaded &&
							<Field
								name="venue"
								type="text"
								component={PlaceIput}
								options={{
									location: new google.maps.LatLng(this.state.cityLatLng),
									radius: 1000,
									types: ['establishment']
								}}
								onSelect={this.handleVenueSelect}
								placeholder="event Venue" />
						}
						<Field
							name="date"
							type="text"
							component={DateInput}
							dateFormat="YYYY-MM-DD HH:mm"
							timeFormat='HH:mm'
							showTimeSelect
							placeholder="Event Date" />
						<Button
							disabled={invalid || submitting || pristine}
							loading={submitting}
							positive type="submit">
							Submit
						</Button>
						<Button onClick={() => this.props.history.goBack} type="button">Cancel</Button>
						<Button 
							type="button"
							color={event.cancelled? 'green' : 'red'}
							onClick={() => cancelToggle(!event.cancelled, event.id)}
							floated="right"
							content={event.cancelled? 'Reactivate event': 'Cancel event'}
						/>
					</Form>
				</Segment>
			</Grid.Column>
		);
	}
}

const mapState = (state) => {

	let event = {};

	if (state.firestore.data.events) {
		//For a single  event remember to add the index = 0 a.k.a "[0]"
		event = state.firestore.ordered.events[0];
		//state.events.filter(event => event.id === eventId)[0];
	}

	return {
		//to initialize redux forms
		initialValues: event,
		event: event
	}
}

const actions = {
	createEvent,
	updateEvent,
	cancelToggle
}

export default withFirestore(connect(mapState, actions)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm)));