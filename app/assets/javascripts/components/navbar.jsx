import React from 'react'
import { Link } from 'react-router'

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'>TOP</Link></li>
        </ul>
      </div>
    );
  }
}
