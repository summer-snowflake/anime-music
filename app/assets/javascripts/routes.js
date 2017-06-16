import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app.js'
import Welcome from './components/welcome/welcome.js'
import AnimeDetailPage from './components/welcome/anime/anime_detail_page.js'
import LoginPage from './components/account/login/login_page.js'
import Admin from './components/admin/admin.js'
import AdminTopPage from './components/admin/top/admin_top_page.js'
import AdminAnimesPage from './components/admin/animes/admin_animes_page.js'
import AdminAnimes from './components/admin/animes/list/admin_animes.js'
import AdminAnime from './components/admin/animes/detail/admin_anime.js'
import AdminActorsPage from './components/admin/actors/admin_actors_page.js'
import AdminActors from './components/admin/actors/list/admin_actors.js'
import AdminActor from './components/admin/actors/detail/admin_actor.js'

module.exports = (
  <Route component={App} path="/">
    <IndexRoute component={Welcome} />
    <Route component={AnimeDetailPage} path="/animes/:animeId" />
    <Route component={LoginPage} path='/login' />
    <Route component={Admin} path="/admin">
      <IndexRoute component={AdminTopPage} />
      <Route component={AdminAnimesPage} path="/admin/animes">
        <IndexRoute component={AdminAnimes} />
        <Route component={AdminAnime} path="/admin/animes/:animeId" />
      </Route>
      <Route component={AdminActorsPage} path="/admin/actors">
        <IndexRoute component={AdminActors} />
        <Route component={AdminActor} path="/admin/actors/:actorId" />
      </Route>
    </Route>
  </Route>
)
