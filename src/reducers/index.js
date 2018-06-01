import { combineReducers } from 'redux';
import eventReducer from './event';
import modalReducer from './modal';
import authReducer from './auth';
import { reducer as FormReducer } from 'redux-form';
// import {reducer as ToastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer
  // toastr: ToastrReducer
});

export default rootReducer;