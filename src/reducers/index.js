import { combineReducers } from 'redux';
import eventReducer from './event';
import modalReducer from './modal';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer
});

export default rootReducer;