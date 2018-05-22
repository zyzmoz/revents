import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Switch, Route, Redirect, BrowserRouter as Router  } from 'react-router-dom'
import SettingsNav from './SettingsNav'
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage'
import AccountPage from './AccountPage'
import BasicsPage from './BasicsPage'

const SettingsDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        
          <Switch>
            <Redirect exact from='/settings' to='/settings/basics'/>
            <Route path='/settings/basics' component={() => <BasicsPage />} />
            <Route path='/settings/about' component={AboutPage} />
            <Route path='/settings/photos' component={PhotosPage} />
            <Route path='/settings/account' component={AccountPage} />
          </Switch>
        
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  )
}

export default SettingsDashboard
