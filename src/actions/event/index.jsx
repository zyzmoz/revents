import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from './constants';
import { toast } from 'react-toastify';
import { createNewEvent } from '../../components/util/helpers';
import moment from 'moment';


export const createEvent = (event) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    event = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, event);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`,
        {
          eventId: createdEvent.id,
          userUid: user.uid,
          eventDate: event.date,
          host: true
        }
      );
      toast.success('Event has been created', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
}

export const updateEvent = (event) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate();
    }
    try {
      await firestore.update(`events/${event.id}`, event);
      toast.success('Event updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }
}

export const cancelToggle = (cancelled, eventId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${eventId}`, {
        cancelled: cancelled
      }); 
      
      
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
      });      
    }
  }
}

export const deleteEvent = (eventId) => {
  return dispatch => {
    try {
      dispatch({
        type: DELETE_EVENT,
        payload: {
          eventId
        }
      });
      toast.success('Event deleted successfully', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }

  }
}