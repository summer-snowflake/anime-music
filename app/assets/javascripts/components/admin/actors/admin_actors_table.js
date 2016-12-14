import React, { Component, PropTypes } from 'react'
import AdminActorRow from './admin_actor_row.js'
import { domain } from './../../../domain.js'

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
    fetch(domain + this.props.url)
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
      <table className='table'>
        <tbody>
          {this.state.actors.map((actor) =>
            <AdminActorRow actor={actor} key={actor.id} />
          )}
        </tbody>
      </table>
    )
  }
}

AdminActorsTable.propTypes = {
  url: PropTypes.string.isRequired
}
