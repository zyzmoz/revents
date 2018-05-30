import React from 'react';
import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const ModalManager = ({currentModal}) => {
  let renderModal;
  if (currentModal){
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderModal = <ModalComponent  {...modalProps} />
  }
  return (
    <span>
      {renderModal}
    </span>
  );
};

const mapState = (state) => (
  {
    currentModal: state.modals
  }
);

const modalLookup = {
  //modals that we'll create
  LoginModal,
  RegisterModal
} 

export default connect(mapState)(ModalManager);