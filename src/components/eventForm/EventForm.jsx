import React, { Component } from 'react';
import { Segment, Form, Button, Header, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import imageSrc from '../../assets/img/react.png';
import {
	createEvent,
	updateEvent

} from '../../actions/event';
import Script from 'react-load-script';

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
		scriptLoaded: false

	}

	handleCitySelect = (selectedCity) => {
		geocodeByAddress(selectedCity)
			.then(results => getLatLng(results[0]))
			.then(latlng => this.setState({ cityLatLng: latlng }));
	}


	onFormSubmit = (values) => {
		values.date = moment(values.date).format("YYYY-MM-DD HH:mm");
		if (values.id) {
			this.props.updateEvent(values);
			this.props.history.goBack();
		} else {
			const uid = Math.floor(Math.random() * Math.floor(1000)).toString();
			const newEvent = {
				...values,
				id: uid,
				hostPhotoURL: imageSrc,
				attendees: [
					{
						id: uid,
						name: values.hostedBy,
						photoURL: imageSrc,
						isHost: true
					}
				]
			}
			this.props.createEvent(newEvent);
			this.props.history.push('/events');
		}
	}

	handleScriptLoad = () => this.setState({scriptLoaded: true});

	render() {
		const { invalid, submitting, pristine } = this.props;
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
									types: ['address'] 
								}} 
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
							positive type="submit">
							Submit
						</Button>
						<Button onClick={() => this.props.history.goBack} type="button">Cancel</Button>
					</Form>
				</Segment>
			</Grid.Column>
		);
	}
}

const mapState = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event = {};

	if (eventId && state.events.length > 0) {
		//For a single  event remember to add the index = 0 a.k.a "[0]"
		event = state.events.filter(event => event.id === eventId)[0];
	}

	return {
		//to initialize redux forms
		initialValues: event
	}
}

const actions = {
	createEvent,
	updateEvent
}

export default connect(mapState, actions)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm));