import {
  LOGIN_USER
} from './constants';
// import firebase from 'firebase';
import { SubmissionError } from 'redux-form';
import { closeModal } from '../modal';


export const login = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    //Thunk is a middleware to intercept and fire some actions depending the condition
    //So, If you're not sure whether you need it, you probably don't!
    //Using thunk each state will change depending what was passed to dispatch
    // It also will work with actions!
    // dispatch({ type: LOGIN_USER, payload: { creds } });
    // return 
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      // dispatch({ type: LOGIN_USER, payload: { creds } });
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }

  }
}

export const registerUser = (user) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {

      //create user
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      //update user
      console.log(createdUser);
      // await createdUser.updateProfile({
      //   displayName: user.displayName
      // });

      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }

      await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
      dispatch(closeModal());
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      })
    }
  }
}

export const socialLogin = (selectedProvider) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {      
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      });
      //
      console.log(user);
      if (user.additionalUserInfo.isNewUser){
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}