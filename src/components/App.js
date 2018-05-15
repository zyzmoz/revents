import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import HomePage from '../pages/Home';
import MenuComponent from './Menu';
import EventDashboard from '../components/event/EventDashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () =>
  <Router >
    <div>
      <MenuComponent />
      <Container className="main">
        <Route exact path="/"
          component={() => <EventDashboard />}
        />
      </Container>
    </div>
  </Router>

export default App;