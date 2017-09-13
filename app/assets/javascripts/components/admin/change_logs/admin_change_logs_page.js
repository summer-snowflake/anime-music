import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class AdminChangeLogsPage extends Component {
  render() {
    return (
      <div className='adminChangeLogsPageComponent'>
        {this.props.children}
      </div>
    )
  }
}

AdminChangeLogsPage.propTypes = {
  children: PropTypes.any.isRequired
}
