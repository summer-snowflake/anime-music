import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import LoadingImage from './../../common/_loading_image'
import MessageBox from './../../common/_message_box'

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingLogin: false,
      message_type: 'success',
      message: ''
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.updateSuccess = this.updateSuccess.bind(this)
    this.updateFailed = this.updateFailed.bind(this)
  }

  handleClickSubmitButton(e) {
    e.preventDefault()
    let params = { email: this.refs.email.value, password: this.refs.password.value }
    this.props.handleClickLoginButton(params)
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  updateSuccess(access_token) {
    localStorage.setItem('access_token', access_token)
    browserHistory.push('/admin')
  }

  updateFailed(message) {
    this.setState({
      loadingLogin: false,
      message_type: 'danger',
      message: message
    })
    setTimeout(this.handleTimeout, 2000)
  }

  render() {
    return (
      <div className='loginFormComponent'>
        <form onSubmit={this.handleClickSubmitButton}>
          <div className='form-group'>
            <label htmlFor='email'>{'Emailアドレス'}</label>
            <input className='form-control' id='email' ref='email' type='text' />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>{'パスワード'}</label>
            <input className='form-control' id='password' ref='password' type='password' />
          </div>
          <button className='btn btn-danger animate-button'
            disabled={this.state.loadingLogin}
            type='submit'>
            {'ログイン'}
          </button>
        </form>
        <LoadingImage loading={this.state.loadingLogin} />
        <MessageBox message={this.state.message} message_type={this.state.message_type} />
      </div>
    )
  }
}

LoginForm.propTypes = {
  handleClickLoginButton: PropTypes.func.isRequired
}
