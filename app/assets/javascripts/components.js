//= require_self
//= require react
//= require react_ujs
//= require_tree ./components

import React from 'react'

window.React = require('react');
window.R = React.DOM;
window.ReactDOM = require('react-dom');
window.ReactRouter = require('react-router');
window.Router = ReactRouter.Router;
window.Route = ReactRouter.Route;
window.Link = ReactRouter.Link;
window.hashHistory = ReactRouter.hashHistory;

//require('./routes.js.coffee');

window.AnimeList = require('./components/anime_list.js.coffee');
window.AdminMenu = require('./components/admin/admin_menu.js.coffee');
window.AdminAnimesTable = require('./components/admin/admin_animes_table.js.coffee');
