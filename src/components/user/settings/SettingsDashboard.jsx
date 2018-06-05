import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import SettingsNav from './SettingsNav'
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import BasicsPage from './BasicsPage';
import { updatePassword } from '../../../actions/auth';

const actions = {
  updatePassword
}

const SettingsDashboard = ({updatePassword}) => {
  return (
    <Grid>
      <Grid.Column width={12}>

        <Switch>
          <Redirect exact from='/settings' to='/settings/basics' />
          <Route path='/settings/basics' component={() => <BasicsPage />} />
          <Route path='/settings/about' component={AboutPage} />
          <Route path='/settings/photos' component={PhotosPage} />
          <Route path='/settings/account' component={() => <AccountPage updatePassword={updatePassword}/>} />
        </Switch>

      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  )
}

export default connect(null, actions)(SettingsDashboard);
