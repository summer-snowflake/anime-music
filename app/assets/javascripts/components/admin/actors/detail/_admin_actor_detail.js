import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

import AdminActorTitle from './_admin_actor_title'

export default class AdminActorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actor: { name: '' },
      editingTitle: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.loadActorsFromServer()
  }

  onSubmit(params) {
    this.updateActorAgainstServer(params)
  }

  loadActorsFromServer() {
    fetch(origin + 'api/admin/actors/' + this.props.actor_id, {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({actor: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  updateActorAgainstServer(params) {
    fetch(origin + 'api/admin/actors/' + this.props.actor_id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '200') {
          this.setState({actor: params})
          if(params.name) {
            this.refs.name.updateSuccess()
          }
        } else {
          res.json().then((json) => {
            if(params.name != undefined) {
              this.refs.name.updateFailed(json.error_messages[0])
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='adminActorDetailComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <AdminActorTitle
              handleUpdateName={this.onSubmit}
              name={this.state.actor.name}
              ref='name'
              />
          </div>
        </div>
      </div>
    )
  }
}

AdminActorDetail.propTypes = {
  actor_id: PropTypes.string.isRequired
}
