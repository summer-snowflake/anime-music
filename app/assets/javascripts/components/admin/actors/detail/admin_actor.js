import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AdminActorDetail from './_admin_actor_detail.js'

export default class AdminActor extends Component {
  render() {
    return (
      <div className='adminActorComponent'>
        <AdminActorDetail actor_id={this.props.params.actorId} />
      </div>
    )
  }
}

AdminActor.propTypes = {
  params: PropTypes.object.isRequired
}
