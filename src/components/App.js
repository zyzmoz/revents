import React, { Component } from 'react';
import HomePage from '../pages/Home';
import MenuComponent from './Menu';
import EventDashboard from '../components/event/EventDashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () =>
  <Router >
    <div>
      <MenuComponent />
      <Route exact path="/"
        component={() => <EventDashboard />}
      />
    </div>
  </Router>

export default App;