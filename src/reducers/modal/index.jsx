import {
  MODAL_OPEN,
  MODAL_CLOSE
} from '../../actions/modal/constants';

import { createReducer } from '../createReducer';

const initialState = null;

export const openModal = (state, payload) => {
  const { modalType, modalProps } = payload;
  return { modalType, modalType };
}

export const closeModal = (state, payload) => {
  return null;
}

export default createReducer(initialState, {
  [MODAL_CLOSE]: closeModal,
  [MODAL_OPEN]: openModal
});