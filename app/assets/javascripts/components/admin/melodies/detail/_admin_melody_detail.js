import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { origin } from './../../../../origin.js'

export default class AdminMelodyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      melody: { title: '' }
    }
  }

  componentDidMount() {
    this.loadMelodyFromServer()
  }

  loadMelodyFromServer() {
    fetch(origin + 'api/admin/melodies/' + this.props.melody_id, {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({melody: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminMelodyDetailComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            {this.state.melody.title}
          </div>
        </div>
      </div>
    )
  }
}

AdminMelodyDetail.propTypes = {
  melody_id: PropTypes.string.isRequired
}
