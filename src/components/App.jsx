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
  <div>
    <Switch>
      <Route exact path="/"
        component={HomePage}
      />
    </Switch>
    <Route path="/(.+)/"
      render={() => (
        <div>
          <MenuComponent />
          <Container className="main">
            <Switch>
              {/* User EXACT just when its an UNIQUE url that doesn't share anything with other routes */}
              <Route path="/events"
                component={EventDashboard}
              />
              <Route path="/event/:id"
                component={EventDetailedPage}
              />
              <Route path="/manage/:id"
                component={EventForm}
              />
              <Route path="/people"
                component={PeopleDashboard}
              />
              <Route path="/profile/:id"
                component={UserDetailedPage}
              />
              <Route path="/settings"
                component={SettingsPage}
              />

              <Route path="/createEvent"
                component={EventForm}
              />

            </Switch>
          </Container>

        </div>
      )}
    />
  </div>


export default App;