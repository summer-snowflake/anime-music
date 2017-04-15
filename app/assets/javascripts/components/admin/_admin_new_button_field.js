import React, { Component, PropTypes } from 'react'
import MessageBox from './../common/_message_box'

export default class AdminNewButtonField extends Component {
  constructor(props) {
    super(props)
    this.handleClickNewButton = this.handleClickNewButton.bind(this)
  }

  handleClickNewButton() {
    this.props.onLoadNewForm()
  }

  render() {
    return (
      <div className='adminNewButtonFieldComponent'>
        <a className='btn btn-default' onClick={this.handleClickNewButton}>
          <span className='glyphicon glyphicon-pencil' />
          {'New ' + this.props.name}
        </a>
        <MessageBox message={this.props.message} message_type={this.props.message_type} />
      </div>
    )
  }
}

AdminNewButtonField.propTypes = {
  name: PropTypes.string.isRequired,
  onLoadNewForm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  message_type: PropTypes.string.isRequired
}
