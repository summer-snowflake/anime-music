import React, { Component, PropTypes } from 'react'

export default class MessageBox extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    let message_box_jsx = (
      <div className={'alert alert-' + this.props.message_type}>
        {this.props.message}
      </div>
    )

    return (
      <div className='messageBoxComponent'>
        {this.props.message != '' ? (
          message_box_jsx
        ) : (
          null
        )}
      </div>
    )
  }
}

MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  message_type: PropTypes.string.isRequired
}
