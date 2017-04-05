import React from 'react'
//import { IndexRoute } from 'react-router'
import { Route } from 'react-router-dom'

import App from './components/app.js'
import Welcome from './components/welcome/welcome.js'
import Admin from './components/admin/admin.js'
import AdminTopPage from './components/admin/top/admin_top_page.js'
import AdminAnimesPage from './components/admin/animes/admin_animes_page.js'
import AdminAnimes from './components/admin/animes/list/admin_animes.js'
import AdminAnime from './components/admin/animes/detail/admin_anime.js'
import AdminActorsPage from './components/admin/actors/admin_actors_page.js'
import AdminActors from './components/admin/actors/list/admin_actors.js'
import AdminActor from './components/admin/actors/detail/admin_actor.js'

module.exports = (
  <Route component={App} pattern="/">
    <Route component={Admin} pattern="/admin">
      <Route component={AdminAnimesPage} pattern="/admin/animes">
        <Route component={AdminAnime} patttern="/admin/animes/:animeId" />
      </Route>
      <Route component={AdminActorsPage} patttern="/admin/actors">
        <Route component={AdminActor} pattern="/admin/actors/:actorId" />
      </Route>
    </Route>
  </Route>
)
