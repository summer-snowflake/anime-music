import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import LoginForm from './_login_form'
import { origin } from './../../../origin.js'

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login(params) {
    fetch(origin + 'api/session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '200') {
          res.json().then((json) => {
            this.refs.login.updateSuccess(json.access_token)
          })
        } else {
          res.json().then((json) => {
            this.refs.login.updateFailed(json.error_messages[0])
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='loginPageComponent'>
        <div className='col-md-8 col-md-offset-2'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <LoginForm handleClickLoginButton={this.login} ref='login' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
