import React from 'react';
import { Segment, List, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import imageSrc from '../../assets/img/react.png';
import {objectToArray} from '../util/helpers';

const EventDetailedSidebar = ({ attendees }) => {
  // const {host} = attendees;
  return (
    <div>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees && objectToArray(attendees).map(attendee => (
            <Item key={attendee.id} style={{ position: 'relative' }}>
              {attendee.host &&
                <Label
                  style={{ position: 'absolute' }}
                  color="orange"
                  ribbon="right"
                >
                  Host
            </Label>
              }
              <Item.Image size="tiny" src={attendee.photoURL} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <a href={`/profile/${attendee.id}`}>{attendee.displayName}</a>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}

        </List>
      </Segment>
    </div>
  );
};

export default EventDetailedSidebar;