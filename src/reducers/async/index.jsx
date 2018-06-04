import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR

} from '../../actions/async/constants';
import { createReducer } from '../createReducer';

const initialState = {
  loading: false
}

export const asyncActionStarted = (state) => {
  return {...state, loading: true}
}

export const asyncActionFinished = (state) => {
  return {...state, loading: false}
}

export const asyncActionError = () => {
  return {...state, loading: false}
}

export default combineReducers({
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinished,
  [ASYNC_ACTION_ERROR]: asyncActionErrors
})