import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react'

const EventDetailedInfo = ({event}) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{event.date}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon color="teal" name="marker" color="teal" size="large" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{event.venue}</span>
            <Button color="teal" floated="right">Show Map</Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedInfo;