import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AdminMenu extends Component {
  render() {
    return (
      <div>
        <ul role="nav">
          <li><Link activeClassName='active' onlyActiveOnIndex to="/admin">{'管理TOP'}</Link></li>
          <li><Link activeClassName='active' to="/admin/animes">{'アニメ'}</Link></li>
          <li><Link activeClassName='active' to="/admin/actors">{'声優'}</Link></li>
        </ul>
      </div>
    )
  }
}
