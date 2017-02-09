//= require_self
//= require react
//= require react_ujs

import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
require('bootstrap/dist/css/bootstrap.css')
require('!style-loader!css-loader!sass-loader!./../stylesheets/application.scss')

import routes from './routes.js'

render(<Router routes={routes} history={browserHistory} />, document.getElementById('content'))
