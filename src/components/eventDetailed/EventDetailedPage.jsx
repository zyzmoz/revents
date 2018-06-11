import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { connect } from 'react-redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { toast } from 'react-toastify';



class EventDetailedPage extends Component {

  async componentDidMount() {
    const { firestore, match, history } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      history.push('/events');
      toast.warn('Event not found', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  render() {
    const { event, auth } = this.props;
    console.log(event);
    const isHost = event.hostUid === auth.uid;    
    const isGoing = event.attendees && Object.keys(event.attendees).some(id => id === auth.uid );
    console.log(event.hostUid, auth.uid ,isHost);
    return (
      <Grid>
        { event  &&
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} isHost={isHost}  isGoing={isGoing} />
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>}
        <Grid.Column width={6}>
          {event && event.attendees &&
          <EventDetailedSidebar attendees={event.attendees} />
          }
        </Grid.Column>
      </Grid>
    );
  }
}


const mapState = (state, ownProps) => {
  let event;
  if (state.firestore.data.events) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event,
    auth: state.firebase.auth
  }
}

export default withFirestore(connect(mapState)(EventDetailedPage));
