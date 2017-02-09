import React, { Component, PropTypes } from 'react'
import AdminActorDetail from './_admin_actor_detail.js'

export default class AdminActor extends Component {
  render() {
    return (
      <div className='adminActorComponent'>
        <AdminActorDetail url={'api/admin/actors/' + this.props.params.actorId} />
      </div>
    )
  }
}

AdminActor.propTypes = {
  params: PropTypes.object.isRequired
}
