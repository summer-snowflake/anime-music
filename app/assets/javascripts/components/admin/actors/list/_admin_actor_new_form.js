import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { origin } from './../../../../origin.js'
import MessageBox from './../../../common/_message_box'
import AdminNewButtonField from './../../_admin_new_button_field'

export default class AdminActorNewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      loadingForm: false,
      unsaved_name: '',
      message_type: 'success',
      message: ''
    }
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
  }

  handleShowNewForm() {
    this.setState({showForm: true})
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  handleClickSubmitButton() {
    this.setState({loadingForm: true})
    this.postActorAgainstServer()
  }

  handleChangeName(e) {
    this.setState({unsaved_name: e.target.value})
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  postActorAgainstServer() {
    const params = { actor: { name: this.state.unsaved_name }}
    fetch(origin + 'api/admin/actors', {
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
            loadingForm: false,
            unsaved_name: '',
            message_type: 'success',
            message: '「' + this.state.unsaved_name + '」を登録しました'
          })
          this.props.handleLoad()
          setTimeout(this.handleTimeout, 2000)
        } else {
          this.setState({editingName: true, name: ''})
          res.json().then((json) => {
            this.setState({
              loadingForm: false,
              message_type: 'danger',
              message: json.error_messages[0]
            })
            setTimeout(this.handleTimeout, 2000)
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
      <div className={'adminActorNewFormComponent new-form-field ' + field_status}>
        {this.state.showForm ? (
          <div className='media'>
            <div className='media-body non-bordered'>
              <div className='form-group name'>
                <input autoFocus className='form-control' disabled={this.state.loadingForm} id='name' name='name' onChange={this.handleChangeName} placeholder='声優名' type='text' />
              </div>
              <a className='btn btn-danger animate-button' disabled={this.state.loadingForm} onClick={this.handleClickSubmitButton} type='submit'>
                {'登録'}
              </a>
              <a className='btn btn-default cancel-button' disabled={this.state.loadingForm} onClick={this.handleClickCancelButton} type='submit'>
                {'キャンセル'}
              </a>
              <MessageBox message={this.state.message} message_type={this.state.message_type} />
            </div>
          </div>
        ) : (
          <AdminNewButtonField message={this.state.message} message_type={this.state.message_type} name='声優' onLoadNewForm={this.handleShowNewForm} />
        )}
      </div>
    )
  }
}

AdminActorNewForm.propTypes = {
  handleLoad: PropTypes.func.isRequired
}
