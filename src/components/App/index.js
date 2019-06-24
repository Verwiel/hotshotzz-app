import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import Login from '../Forms/Login'
import UserPage from '../../pages/UserPage'
import AdminPage from '../../pages/AdminPage';

export default () => (
  <>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={Login}/>
      <Route exact path="/user" component={UserPage}/>
      <Route exact path="/admin" component={AdminPage}/>

    </Switch>
  </>
)