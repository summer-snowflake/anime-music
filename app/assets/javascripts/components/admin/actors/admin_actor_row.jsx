import React from 'react'

class AdminActorRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.actor.name}</td>
        <td><a href={'/admin/actors/' + this.props.actor.id}>Show</a></td>
        <td><a href={'/admin/actors/' + this.props.actor.id + '/edit'}>Edit</a></td>
        <td><a href={'/admin/actors/' + this.props.actor.id} data-method='delete'>Destroy</a></td>
      </tr>
    )
  }
}

module.exports = AdminActorRow
