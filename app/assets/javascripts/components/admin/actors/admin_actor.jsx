import React, { Component } from 'react'

export default class AdminActor extends Component {
  render() {
    return (
      <div>
        Admin Actor # {this.props.params.actorId}
      </div>
    )
  }
}
