import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AdminMenu from './_admin_menu.js'

export default class Admin extends Component {
  render() {
    return (
      <div className='adminComponent'>
        <AdminMenu />
        {this.props.children}
      </div>
    )
  }
}

Admin.propTypes = {
  children: PropTypes.any.isRequired
}
