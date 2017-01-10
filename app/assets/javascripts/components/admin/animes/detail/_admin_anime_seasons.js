import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'
import AdminAnimeSeason from './_admin_anime_season'

export default class AdminAnimeSeasons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seasons: []
    }
  }

  componentDidMount() {
    this.loadSeasonsFromServer()
  }

  loadSeasonsFromServer() {
    fetch(origin + 'api/admin/animes/' + this.props.id + '/seasons')
      .then((res) => res.json())
      .then((res) => {
        this.setState({seasons: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminAnimeSeasonsComponent'>
        {this.state.seasons.map((season) =>
          <AdminAnimeSeason key={season.id} season={season} />
        )}
      </div>
    )
  }
}

AdminAnimeSeasons.propTypes = {
  id: PropTypes.string.isRequired
}
