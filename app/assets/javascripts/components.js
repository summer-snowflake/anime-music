//= require_self
//= require react_ujs

import React from 'react'
import ReactDOM from 'react-dom'

window.React = React
window.ReactDOM = ReactDOM

import AnimeList from './components/anime_list.jsx'
import AdminAnimesTable from './components/admin/admin_animes_table.jsx'

window.AnimeList = AnimeList
window.AdminAnimesTable = AdminAnimesTable
