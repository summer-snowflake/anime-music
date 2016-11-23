import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link activeClassName='active' onlyActiveOnIndex to='/'>{'TOP'}</Link></li>
        </ul>
      </div>
    )
  }
}
