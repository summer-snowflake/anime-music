import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes.js'

render(<Router routes={routes} history={browserHistory} />, document.getElementById('content'))
