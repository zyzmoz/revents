import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logoSrc  from '../../assets/img/react.png';

const SignedInMenu = ({signOut, currentUser}) => {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={logoSrc} />
      <Dropdown pointing="top left" text={currentUser}>
        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item as={Link} to="/settings" text="Settings" icon="settings" />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;