import { combineReducers } from 'redux';
import eventReducer from './event';
import modalReducer from './modal';
import authReducer from './auth';
import { reducer as FormReducer } from 'redux-form';
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import asyncReducer from './async';

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  async: asyncReducer
});

export default rootReducer;