import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import LoginForm from '../auth/LoginForm';

class LoginModal extends Component {
  render() {
    return (
      <Modal
        size="mini"
        open={true}
        onClose={this.props.closeModal}
      >
        <Modal.Header>
          Login to Revents
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const actions = { closeModal };

export default connect(null, actions)(LoginModal);