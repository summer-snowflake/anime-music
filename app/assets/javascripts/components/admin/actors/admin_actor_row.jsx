import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AdminActorRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.actor.name}</td>
        <td><Link to={'/admin/actors/' + this.props.actor.id}>Show</Link></td>
      </tr>
    )
  }
}

