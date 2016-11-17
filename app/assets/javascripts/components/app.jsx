import React from 'react'
import { Link } from 'react-router'
import Navbar from './navbar.jsx'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
