import React, { Component, PropTypes } from 'react'

export default class Melody extends Component {
  render () {
    return (
      <div className='melodyComponent'>
        <div className='circle'>
          <span className='glyphicon glyphicon-music pull-left' />
        </div>
        <div className='label label-info kind-label'>
          {this.props.melody.kind.toUpperCase()}
        </div>
        <div className='title'>
          {this.props.melody.title}
        </div>
      </div>
    )
  }
}

Melody.propTypes = {
  melody: PropTypes.object.isRequired
}
