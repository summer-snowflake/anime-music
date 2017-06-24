import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class AdminMelodiesPage extends Component {
  render() {
    return (
      <div className='adminMelodiesPageComponent'>
        {this.props.children}
      </div>
    )
  }
}

AdminMelodiesPage.propTypes = {
  children: PropTypes.any.isRequired
}
