import React, { Component } from 'react'
import AdminActorRow from './_admin_actor_row.js'
import AdminActorNewForm from './_admin_actor_new_form.js'
import { origin } from './../../../../origin.js'

export default class AdminActorsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actors: []
    }
    this.loadActorsFromServer = this.loadActorsFromServer.bind(this)
  }

  componentDidMount() {
    this.loadActorsFromServer()
  }

  loadActorsFromServer() {
    fetch(origin + 'api/admin/actors', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({actors: res.actors})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminActorsTableComponent'>
        <AdminActorNewForm handleLoad={this.loadActorsFromServer} />
        {this.state.actors.map((actor) =>
          <AdminActorRow actor={actor} handleLoad={this.loadActorsFromServer} key={actor.id} />
        )}
      </div>
    )
  }
}
