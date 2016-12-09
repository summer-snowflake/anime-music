//= require_self
//= require react
//= require react_ujs

import React from 'react'
import ReactDOM from 'react-dom'

import routes from './routes.js'

$.ajaxSetup({
  cache: false,
  timeout: 10000, // 10sec
})
