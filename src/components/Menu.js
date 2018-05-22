import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logoSrc from '../assets/img/react.png';

const MenuComponent = () =>
  <Menu inverted fixed="top">    
    <Container>
      <Menu.Item header>
        <img className="logo" src={logoSrc} />
        Re-vents
        
      </Menu.Item>
      <Menu.Item name="Events"/>
      <Menu.Item>
        <Button floated="right" positive inverted content="Create Event" />
      </Menu.Item>
      <Menu.Item position="right">
        <Button basic inverted content="Login" />
        <Button basic inverted content="Sign Out" style={{marginLeft: '0.5em'}} />
      </Menu.Item>
    </Container>
  </Menu>


export default MenuComponent;