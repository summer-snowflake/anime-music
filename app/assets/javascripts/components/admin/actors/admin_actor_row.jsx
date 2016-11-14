import React from 'react'

class AdminActorRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.actor.name}</td>
        <td><a href={'/admin/actors/' + this.props.actor.id}>show</a></td>
      </tr>
    )
  }
}

module.exports = AdminActorRow
