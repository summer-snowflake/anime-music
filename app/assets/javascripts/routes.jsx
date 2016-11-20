import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './components/app.jsx'
import Welcome from './components/welcome/welcome.jsx'
import Admin from './components/admin/admin.jsx'
import AdminAnimes from './components/admin/animes/admin_animes.jsx'
import AdminAnime from './components/admin/animes/admin_anime.jsx'
import AdminActors from './components/admin/actors/admin_actors.jsx'
import AdminActor from './components/admin/actors/admin_actor.jsx'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/admin" component={Admin}>
        <Route path="/admin/animes" component={AdminAnimes} />
        <Route path="/admin/animes/:animeId" component={AdminAnime} />
        <Route path="/admin/actors" component={AdminActors} />
        <Route path="/admin/actors/:actorId" component={AdminActor} />
      </Route>
    </Route>
  </Router>
)

render(routes, document.getElementById('content'))
