import React, { Component } from 'react'
import AdminActorDetail from './admin_actor_detail.js'

export default class AdminActor extends Component {
  render() {
    return (
      <div>
        <AdminActorDetail url={'/api/admin/actors/' + this.props.params.actorId} />
      </div>
    )
  }
}