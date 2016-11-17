import React, { Component } from 'react'

export default class AdminActorRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.actor.name}</td>
      </tr>
    )
  }
}

