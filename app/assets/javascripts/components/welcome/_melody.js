import React, { Component, PropTypes } from 'react'

export default class Melody extends Component {
  render () {
    return (
      <div className='melodyComponent'>
        <div className='label label-info kind-label'>
          {this.props.melody.kind.toUpperCase()}
        </div>
        {this.props.melody.title}
      </div>
    )
  }
}

Melody.propTypes = {
  melody: PropTypes.object.isRequired
}
