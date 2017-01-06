import React, { Component, PropTypes } from 'react'
import Navbar from './_navbar.js'

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

App.propTypes = {
  children: PropTypes.any.isRequired
}
