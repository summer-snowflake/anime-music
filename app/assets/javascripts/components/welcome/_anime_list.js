import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Anime from './_anime.js'
import { origin } from './../../origin.js'

export default class AnimeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seasons: []
    }
    this.handleDisplayAdvertisements = this.handleDisplayAdvertisements.bind(this)
  }

  componentDidMount() {
    this.loadAnimesFromServer()
  }

  handleDisplayAdvertisements(season_id) {
    this.props.onDisplayAdvertisements(season_id)
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
      <div className='animeListComponent'>
        {this.state.seasons.map((season) =>
          <Anime key={season.id} onDisplayAdvertisements={this.handleDisplayAdvertisements} season={season} />
        )}
      </div>
    )
  }
}

AnimeList.propTypes = {
  onDisplayAdvertisements: PropTypes.func.isRequired
}
