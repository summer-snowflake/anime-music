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

  componentWillMount() {
    this.loadActorsFromServer()
  }

  loadActorsFromServer() {
    $.ajax({
      url: domain + this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({actors: res.actors})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }
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
