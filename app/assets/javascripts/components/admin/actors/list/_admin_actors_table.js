import React, { Component, PropTypes } from 'react'
import AdminActorRow from './_admin_actor_row.js'
import { origin } from './../../../../origin.js'

export default class AdminActorsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actors: []
    }
  }

  componentDidMount() {
    this.loadActorsFromServer()
  }

  loadActorsFromServer() {
    fetch(origin + this.props.url)
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
        <table className='table'>
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

AdminActorsTable.propTypes = {
  url: PropTypes.string.isRequired
}
