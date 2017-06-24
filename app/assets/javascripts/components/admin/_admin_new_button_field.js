import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
      <div className='adminNewButtonFieldComponent' onClick={this.handleClickNewButton}>
        {this.props.name + 'の登録'}
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
