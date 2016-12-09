import React, { Component, PropTypes } from 'react'
import { domain } from './../../../domain.js'

export default class AdminActorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actor: {}
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
        this.setState({actor: res})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }
    })
  }

  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          {this.state.actor.name}
        </div>
        <div className='panel-body' />
      </div>
    )
  }
}

AdminActorDetail.propTypes = {
  url: PropTypes.string.isRequired
}
