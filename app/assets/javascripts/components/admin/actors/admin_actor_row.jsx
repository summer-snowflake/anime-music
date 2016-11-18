import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AdminActorRow extends Component {
  render() {
    return (
      <tr id={'actor-' + this.props.actor.id}>
        <td><Link to={'/admin/actors/' + this.props.actor.id}>{this.props.actor.name}</Link></td>
      </tr>
    )
  }
}

