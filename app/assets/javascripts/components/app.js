import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Navbar from './_navbar.js'
import { origin } from './../origin'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { email: '', admin: false }
    }
    this.loadUserFromServer = this.loadUserFromServer.bind(this)
    this.loginStatus = this.loginStatus.bind(this)
  }

  componentWillMount() {
    this.loginStatus()
  }

  componentWillReceiveProps(nextProps) {
    this.loginStatus()
  }

  loginStatus() {
    if (localStorage.getItem('access_token') != 'undefined') {
      this.loadUserFromServer()
    } else if (this.props.location.pathname.match(/\/admin/)) {
      browserHistory.push('/login')
    } else {
      this.setState({user: undefined})
    }
  }

  loadUserFromServer() {
    fetch(origin + 'api/user', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => {
        if(res.status == '401') {
          browserHistory.push('/login')
        } else {
          res.json().then((json) => {
            this.setState({
              user: json
            })
            if (this.props.location.pathname.match(/\/admin/)) {
              if(!json.admin) {
                browserHistory.push('/login')
              }
            }
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='appComponent'>
        <Navbar user={this.state.user} />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.any.isRequired
}
