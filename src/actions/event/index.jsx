import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from './constants';
import { toast } from 'react-toastify';


export const createEvent = (event) => {
  return (dispatch) => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });
      toast.success('Event has been created', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
}

export const updateEvent = (event) => {
  return dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });
      toast.success('Event updated successfully!', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
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
        position: toast.POSITION.TOP_RIGHT
      })
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
    }

  }
}