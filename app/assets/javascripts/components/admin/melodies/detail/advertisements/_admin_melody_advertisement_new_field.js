import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { origin } from './../../../../../origin'
import AdminNewButtonField from './../../../common/_admin_new_button_field'
import AdminAdvertisementForm from './../../../common/_admin_advertisement_form'

export default class AdminMelodyAdvertisementNewField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      message_type: 'success',
      message: ''
    }
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
    this.postAdvertisementAgainstServer = this.postAdvertisementAgainstServer.bind(this)
  }

  handleShowNewForm() {
    this.setState({showForm: true})
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleClickSubmitButton(tag_name, body) {
    const params = { advertisement: {
      melody_id: this.props.melody_id,
      tag_name: tag_name,
      body: body
    }}
    this.postAdvertisementAgainstServer(params)
  }

  postAdvertisementAgainstServer(params) {
    fetch(origin + 'api/admin/advertisements', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '201') {
          this.setState({
            showForm: false,
            message_type: 'success',
            message: name + '登録しました'
          })
          setTimeout(this.handleTimeout, 2000)
          this.props.handleLoadAdvertisements()
        } else {
          res.json().then((json) => {
            this.refs.form.updateFailed(json.error_messages[0])
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    let field_status = this.state.showForm ? 'opened' : 'closed'
    return (
      <div className={'adminMelodyAdvertisementNewFieldComponent new-form-field ' + field_status}>
        {this.state.showForm ? (
          <AdminAdvertisementForm onClose={this.handleClickCancelButton} onSubmit={this.handleClickSubmitButton} ref='form' />
        ) : (
          <AdminNewButtonField message={this.state.message} message_type={this.state.message_type} name='広告' onLoadNewForm={this.handleShowNewForm} />
        )}
      </div>
    )
  }
}

AdminMelodyAdvertisementNewField.propTypes = {
  melody_id: PropTypes.string.isRequired,
  handleLoadAdvertisements: PropTypes.func.isRequired
}
