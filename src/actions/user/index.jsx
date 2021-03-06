import {
  GET_USER,

} from './constants';
import moment from 'moment';
import { SubmissionError } from 'redux-form';
import { toast } from 'react-toastify';
import firebase from 'firebase';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async';

export const updateProfile = (user) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    if (user.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      user.dateOfBirth = moment(user.dateOfBirth).toDate();
    }

    const { isLoaded, isEmpty, ...updatedUser } = user;

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

export const uploadProfileImage = (file, fileName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = firebase. //getFirebase();
    const imgName = Math.floor(Math.random() * Math.floor(999999));
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images/`;
    const options = {
      name: fileName
    };

    try {
      dispatch(asyncActionStart());
      const ref = firebase.storage().ref().child(path + imgName);
      // Upload file
      let uploadedFile = await ref.put(file);
      //let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // get url of image
      let downloadUrl = await ref.getDownloadURL();
      // get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has a photo, if not update profile photo with new image      
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadUrl
        });
        //Optional update auth profile        
      }
      // add the new photo to photos collection
      console.log({ uid: user.uid, downloadUrl });
      await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      }, {
          name: imgName,
          url: downloadUrl
        });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      throw new Error('Problem uploading Photo');
    }


  }
}

export const deletePhoto = (photo) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const ref = firebase.storage().ref().child(`${user.uid}/user_images/${photo.name}`);
    try {
      await ref.delete();
      //firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      return await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos', doc: photo.id }]
      });
    } catch (error) {
      throw new Error('Problem deleting photo');
    }
  }
}

export const setMainPhoto = (photo) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      return await firebase.updateProfile({ photoURL: photo.url });
    } catch (error) {
      throw Error('Problem setting main photo');
    }

  }
}

export const goingToEvent = (event) =>  {
  return async (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    console.log(user);
    const attendee = {
      going: true,
      joinDate: Date.now(),
      photoURL: photoURL || null,
      displayName: getState().firebase.profile.displayName,
      host: false
    }
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: attendee
      });
      await  firestore.set(`event_attendee/${event.id}_${user.uid}`, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false   
      });
      toast.success('You\'ve signed up to the event!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } catch (error) {
      console.log(error)
      toast.error('Oops! Problem signing up to event', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }

  }

}

export const cancelGoingToEvent = (event) => {
  return async (dispatch, getState, {getFirestore, getFirebase}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    console.log('Deleting event subscription')
    let attendees = event.attendees;
    delete attendees[user.uid];
    try {
      await firestore.update(`events/${event.id}`, {
        attendees
      });
      await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
      toast.success('You have removed yourself from the event', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } catch (error) {
      console.log(error);
      toast.error('Oops! Something went wrong!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
}



