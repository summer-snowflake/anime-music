import React, { Component } from 'react'

export default class AdminActorDetail extends Component {
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
  }

  constructor(props) {
    super(props)
    this.state = {
      actor: {}
    }
  }

  componentWillMount() {
    this.loadActorsFromServer()
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
