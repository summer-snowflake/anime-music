import React, { Component, PropTypes } from 'react'

export default class MessageBox extends Component {
  render () {
    return (
      <div className='messageBoxComponent'>
        <span className={'label label-' + this.props.message_type}>
          {this.props.message}
        </span>
      </div>
    )
  }
}

MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  message_type: PropTypes.string.isRequired
}
