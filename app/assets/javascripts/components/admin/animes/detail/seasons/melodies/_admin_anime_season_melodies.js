import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../../origin.js'
import AdminAnimeSeasonMelody from './_admin_anime_season_melody'

export default class AdminAnimeSeasonMelodies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      melodies: []
    }
    this.loadMelodiesFromServer = this.loadMelodiesFromServer.bind(this)
  }

  componentDidMount() {
    this.loadMelodiesFromServer()
  }

  loadMelodiesFromServer() {
    fetch(origin + 'api/admin/seasons/' + this.props.season_id + '/melodies', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({melodies: res.melodies})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminAnimeSeasonMelodiesComponent'>
        {this.state.melodies.map((melody) =>
          <AdminAnimeSeasonMelody key={melody.id} melody={melody} />
        )}
      </div>
    )
  }
}

AdminAnimeSeasonMelodies.propTypes = {
  season_id: PropTypes.number.isRequired
}
