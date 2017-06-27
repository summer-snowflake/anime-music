import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AdminMelodyDetail from './_admin_melody_detail.js'

export default class AdminMelody extends Component {
  render() {
    return (
      <div className='adminMelodyComponent'>
        <AdminMelodyDetail melody_id={this.props.params.melodyId} />
      </div>
    )
  }
}

AdminMelody.propTypes = {
  params: PropTypes.object.isRequired
}
