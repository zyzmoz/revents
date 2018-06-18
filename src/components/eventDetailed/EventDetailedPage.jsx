import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { connect } from 'react-redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import { goingToEvent, cancelGoingToEvent } from '../../actions/user';

const actions = {
  goingToEvent,
  cancelGoingToEvent
}



class EventDetailedPage extends Component {

  async componentDidMount() {
    const { firestore, match, history } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
    // let event = await firestore.get(`events/${match.params.id}`);
    // if (!event.exists) {
    //   history.push('/events');
    //   toast.warn('Event not found', {
    //     position: toast.POSITION.BOTTOM_RIGHT
    //   });
    // }
  }

  async componentWillUnmount() {
    const { firestore, match, history } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`); 
  }

  render() {
    const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;    
    const isHost = event && event.hostUid === auth.uid;    
    const isGoing = event && event.attendees && Object.keys(event.attendees).some(id => id === auth.uid );    
    return (
      <Grid>
        { event  &&
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} isHost={isHost}  isGoing={isGoing} goingToEvent={goingToEvent} cancelGoingToEvent={cancelGoingToEvent} />
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

export default withFirestore(connect(mapState, actions)(EventDetailedPage));
