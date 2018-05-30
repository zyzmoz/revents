import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import logoSrc from '../assets/img/react.png';
import SignedOutMenu from './menus/SignedOutMenu';
import SignedInMenu from './menus/SignedInMenu';
import { openModal } from '../actions/modal';

class MenuComponent extends Component {
  state = {
    authenticated: false
  }

  handleSignIn = () => {
    //this.setState({ authenticated: true });
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignOut = () => {
    this.setState({ authenticated: false });
    this.props.history.push('/');
  }

  render() {
    const { authenticated } = this.state;
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
          <SignedInMenu signOut={this.handleSignOut} /> :
          <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>}

      </Container>
    </Menu>
    )
  }
}

const actions = { openModal };

export default withRouter(connect(null, actions)(MenuComponent));