//= require_self
//= require react_ujs

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

window.React = React
window.ReactDOM = ReactDOM

import Routes from './routes.js'
window.Routes = Routes

import AnimeList from './components/anime_list.jsx'
window.AnimeList = AnimeList

import App from './components/app.js'
window.App = App

import AdminMenu from './components/admin/admin_menu.jsx'
window.AdminMenu = AdminMenu
