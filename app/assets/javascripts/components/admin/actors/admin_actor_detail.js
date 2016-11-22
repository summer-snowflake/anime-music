import React, { Component } from 'react'
import AdminActorRow from './admin_actor_row.js'

export default React.createClass({
  loadActorsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({actor: res})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }
    })
  },

  componentDidMount() {
    this.loadActorsFromServer()
  },

  getInitialState() {
    return { actor: {} }
  },

  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          {this.state.actor.name}
        </div>
        <div className='panel-body'>
        </div>
      </div>
    )
  }
})
