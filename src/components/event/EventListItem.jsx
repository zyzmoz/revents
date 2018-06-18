import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import moment from 'moment';
import format from 'date-fns/format';
import { objectToArray } from '../util/helpers';

class EventListItem extends Component {
	render() {
		const { event, deleteEvent } = this.props;
		return (
			<Segment.Group>
				<Segment>
					<Item>

						<Item.Image size="tiny" circular src={event.hostPhotoURL} />
						<Item.Content>
							<Item.Header as={Link} to={`/event/${event.id}`}>{event.title}</Item.Header>
							<Item.Description>
								Hosted by <a href={`/profile/${event.hostUid}`}>{event.hostedBy}</a>
							</Item.Description>
						</Item.Content>
					</Item>
					{event.cancelled &&
						<Label style={{ top: '-85px' }} ribbon="right" color="red" content="This event has been cancelled!" />
					}
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')} at {format(event.date.toDate(), 'HH:mm')} |
						<Icon name="marker" /> {event.venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{event.attendees &&
							objectToArray(event.attendees).map((attendee) =>
								(<EventListAttendee  key={attendee.id} attendee={attendee} />)
							)
						}

					</List>
				</Segment>
				<Segment clearing>
					<span>{event.description}</span>
					<Button onClick={deleteEvent(event.id)} as="a" color="red" floated="right" content="Delete" />
					<Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />

				</Segment>
			</Segment.Group>
		);
	}
}

export default EventListItem;