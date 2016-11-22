import React, { Component } from 'react'
import AdminMenu from './admin_menu.js'

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
