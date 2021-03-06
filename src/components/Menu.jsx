import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from "react-redux-firebase";
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import logoSrc from '../assets/img/react.png';
import SignedOutMenu from './menus/SignedOutMenu';
import SignedInMenu from './menus/SignedInMenu';
import { openModal } from '../actions/modal';


class MenuComponent extends Component {

  handleSignIn = () => {
    //this.setState({ authenticated: true });
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    // this.setState({ authenticated: false });
    this.props.history.push('/');
  }

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (<Menu inverted fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header>
          <img className="logo" src={logoSrc} />
          Re-vents
      </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name="Events" />
        {authenticated &&
          <Menu.Item as={NavLink} to='/people' name="People" />}

        {authenticated && <Menu.Item>
          <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
        </Menu.Item>}
        {authenticated ?
          <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} /> :
          <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />}

      </Container>
    </Menu>
    )
  }
}

const actions = { openModal };

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default withRouter(withFirebase(connect(mapState, actions)(MenuComponent)));