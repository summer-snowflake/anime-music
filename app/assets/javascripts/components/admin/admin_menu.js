import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AdminMenu extends Component {
  render() {
    return (
      <div>
        <ul role="nav">
          <li><Link to="/admin" activeClassName='active' onlyActiveOnIndex>管理TOP</Link></li>
          <li><Link to="/admin/animes" activeClassName='active'>アニメ</Link></li>
          <li><Link to="/admin/actors" activeClassName='active'>声優</Link></li>
        </ul>
      </div>
    )
  }
}
