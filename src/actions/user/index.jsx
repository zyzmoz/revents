import moment from 'moment';
import { SubmissionError } from 'redux-form';
import { toast } from 'react-toastify';

export const updateProfile = (user) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    if (user.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      user.dateOfBirth = moment(user.dateOfBirth).toDate();
    }
    
    const { isLoaded, isEmpty, ...updatedUser} = user;

    console.log('updating user');
    try {
      await firebase.updateProfile(updatedUser);
      toast.success('Profile Updated', {
        position: toast.POSITION.BOTTOM_RIGHT
      });

    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  }
}

