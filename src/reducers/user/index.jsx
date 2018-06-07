import {
  GET_USER
} from '../../actions/user/constants';
import {createReducer} from '../createReducer';

const initialState = {};

export const getUser = (state, payload) => {
  return [
    ...state, Object.assign({}, payload.user)]
};

export default createReducer(
  initialState, {
    [GET_USER]: getUser,
    
  }
)