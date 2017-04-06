import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import Authenticate from './mixins/authenticate.js'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.handleClickLogout = this.handleClickLogout.bind(this)
  }

  handleClickLogout() {
    localStorage.setItem('access_token', undefined)
    this.setState({user: undefined})
    browserHistory.push('/login')
  }

  render() {
    let admin_link_jsx = (
      <li>
        {(() => {
          if(this.props.user && this.props.user.admin == true)
            return (
              <Link className='animate-button' to='/admin'>
                <span className='glyphicon glyphicon-cog' />
              </Link>
            )
        })()}
      </li>
    )

    return (
      <div className='navbarComponent'>
        <div className='navbar-header'>
          <Link activeClassName='active' className='navbar-brand' onlyActiveOnIndex to='/'>
            <div className='brand-image' />
          </Link>
        </div>
        <div className='collapse navbar-collapse'>
          { (this.props.user) ? (
            <ul className='nav navbar-nav navbar-right' >
              {admin_link_jsx}
              <li ref='email' className='email'>
                <a className='link'>
                  {this.props.user.email}
                </a>
              </li>
              <li onClick={this.handleClickLogout}>
                <a className='link animate-button logout'>
                  {'ログアウト'}
                </a>
              </li>
            </ul>
          ) : (
            // ログイン
            <span />
          )}
        </div>
      </div>
    )
  }
}
