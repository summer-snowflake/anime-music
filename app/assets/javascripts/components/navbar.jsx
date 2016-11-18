import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/' activeClassName='active'>TOP</Link></li>
        </ul>
      </div>
    );
  }
}
