import React, { Component } from 'react'
import { Link } from 'react-router'
import Navbar from './navbar.jsx'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
