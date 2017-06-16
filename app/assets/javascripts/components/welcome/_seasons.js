import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Season from './_season.js'
import { origin } from './../../origin.js'

export default class Seasons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seasons: []
    }
    this.handleDisplayAdvertisement = this.handleDisplayAdvertisement.bind(this)
  }

  componentDidMount() {
    this.loadAnimesFromServer()
  }

  handleDisplayAdvertisement(anime_id) {
    this.props.onDisplayAdvertisement(anime_id)
  }

  loadAnimesFromServer() {
    fetch(origin + 'api/welcome')
      .then((res) => res.json())
      .then((res) => {
        this.setState({seasons: res.seasons})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='seasonsComponent'>
        {this.state.seasons.map((season) =>
          <Season key={season.id} onDisplayAdvertisement={this.handleDisplayAdvertisement} season={season} />
        )}
      </div>
    )
  }
}

Seasons.propTypes = {
  onDisplayAdvertisement: PropTypes.func.isRequired
}
