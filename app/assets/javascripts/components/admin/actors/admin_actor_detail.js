import React, { Component, PropTypes } from 'react'
import { domain } from './../../../domain.js'

export default class AdminActorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actor: {}
    }
  }

  componentDidMount() {
    this.loadActorsFromServer()
  }

  loadActorsFromServer() {
    fetch(domain + this.props.url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({actor: res})
      })
      .catch((error) => {
        console.error(error);
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
