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
    fetch(origin + 'api/admin/actors')
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
        <table className='table table-bordered'>
          <tbody>
            {this.state.actors.map((actor) =>
              <AdminActorRow actor={actor} key={actor.id} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
