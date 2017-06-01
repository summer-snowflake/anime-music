import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class AdminAnimesPage extends Component {
  render() {
    return (
      <div className='adminAnimesPageComponent'>
        {this.props.children}
      </div>
    )
  }
}

AdminAnimesPage.propTypes = {
  children: PropTypes.any.isRequired
}
