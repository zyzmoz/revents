import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import MenuComponent from './Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EventDashboard from '../components/event/EventDashboard';
import HomePage from './home/Home';
import EventDetailedPage from './eventDetailed/EventDetailedPage';
import PeopleDashboard from './user/peopleDashboard/PeopleDashboard';
import UserDetailedPage from './user/userDetailed/UserDetailedPage';
import SettingsPage from './user/settings/SettingsDashboard';
import EventForm from './eventForm/EventForm';

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/"
          component={HomePage}
        />
      </Switch>
      <Route path="/(.+)"
        render={() => (
          <div>
            <MenuComponent />
            <Switch>
              <Container className="main">

                <Route exact path="/events"
                  component={EventDashboard}
                />
                <Route exact path="/events/:id"
                  component={EventDetailedPage}
                />
                <Route exact path="/people"
                  component={PeopleDashboard}
                />
                <Route exact path="/profile/:id"
                  component={UserDetailedPage}
                />
                <Route exact path="/settings"
                  component={SettingsPage}
                />
                <Route exact path="/createEvent"
                  component={EventForm}
                />

              </Container>
            </Switch>
          </div>
        )}
      />
    </div>
  </Router>

export default App;