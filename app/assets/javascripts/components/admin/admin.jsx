import React from 'react'
import { Link } from 'react-router'
import AdminMenu from './admin_menu.jsx'

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <AdminMenu />
        {this.props.children}
      </div>
    )
  }
}
