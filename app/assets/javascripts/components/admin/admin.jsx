import React, { Component } from 'react'
import { Link } from 'react-router'
import AdminMenu from './admin_menu.jsx'

export default class Admin extends Component {
  render() {
    return (
      <div>
        <AdminMenu />
        {this.props.children}
      </div>
    )
  }
}
