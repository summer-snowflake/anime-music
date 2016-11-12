import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import About from './components/about'
import Repos from './components/repos'
import App from './components/app.js'
import AdminMenu from './components/admin/admin_menu.jsx'

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/admin" component={AdminMenu}/>
      <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
)

render(routes, document.body)
