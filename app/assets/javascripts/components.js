//= require_self
//= require react
//= require react_ujs

import React from 'react'
import ReactDOM from 'react-dom'

window.React = React
window.ReactDOM = ReactDOM

import AnimeList from './components/anime_list.jsx'
import AdminAnimesTable from './components/admin/animes/admin_animes_table.jsx'
import AdminActorsTable from './components/admin/actors/admin_actors_table.jsx'

window.AnimeList = AnimeList
window.AdminAnimesTable = AdminAnimesTable
window.AdminActorsTable = AdminActorsTable
