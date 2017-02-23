import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AdminMenu extends Component {
  render() {
    return (
      <div className='adminMenuComponent'>
        <ul className='nav nav-pills' role='tablist'>
          <li role='presentation'>
            <Link activeClassName='active' className='animate-button' onlyActiveOnIndex to='/admin'>{'管理TOP'}</Link>
          </li>
          <li role='presentation'>
            <Link activeClassName='active' className='animate-button' to='/admin/animes'>{'アニメ'}</Link>
          </li>
          <li role='presentation'>
            <Link activeClassName='active' className='animate-button' to="/admin/actors">{'声優'}</Link>
          </li>
        </ul>
      </div>
    )
  }
}
