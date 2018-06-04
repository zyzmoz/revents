import {
  LOGIN_USER,
  SIGN_OUT_USER
} from './constants';
// import firebase from 'firebase';

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
      dispatch({ type: LOGIN_USER, payload: { creds } });
      dispatch(closeModal());  
    } catch (error) {
      console.log(error);
    }
    
  }
}

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}