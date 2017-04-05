import React from 'react'
import { render } from 'react-dom'
//import { browserHistory } from 'react-router'
import { BrowserRouter, Router } from 'react-router-dom'
import routes from './routes.js'

render(<BrowserRouter routes={routes} />, document.getElementById('content'))
