import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Navbar extends Component {
  render() {
    return (
      <div className='navbarComponent'>
        <Link activeClassName='active' onlyActiveOnIndex to='/'>
          <div className='brand-image' />
        </Link>
      </div>
    )
  }
}
