import React from 'react'

class AdminActorRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.actor.name}</td>
      </tr>
    )
  }
}

module.exports = AdminActorRow
