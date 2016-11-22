import React from 'react'
import AdminActorRow from './admin_actor_row.js'

export default React.createClass({
  loadActorsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({actors: res.actors})
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
    return { actors: [] }
  },

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
})
