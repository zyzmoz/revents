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

export const uploadProfileImage = (file, fileName ) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: fileName
    };

    try {
      // Upload file
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // get url of image
      let downloadUrl = await uploadedFile.uploadTaskSnapshot.downloadURL;
      // get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);       
      // check if user has a photo, if not update profile photo with new image
      if (!userDoc.data().photoURL){
        await firebase.updateProfile({
          photoURL: downloadUrl
        });
        //Optional update auth profile        
      }
      // add the new photo to photos collection
      return await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      }, {
        name: fileName,
        url: downloadUrl
      });
      
    } catch (error) {
      console.log(error);
      throw new Error('Problem uploading Photo');
    }


  }
}

