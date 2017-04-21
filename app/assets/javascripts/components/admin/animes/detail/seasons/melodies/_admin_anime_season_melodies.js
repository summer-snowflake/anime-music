import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../../origin.js'
import AdminAnimeSeasonMelody from './_admin_anime_season_melody'
import AdminSeasonMelodyNewField from './_admin_season_melody_new_field'

export default class AdminAnimeSeasonMelodies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      melodies: [],
      showForm: false
    }
    this.loadMelodiesFromServer = this.loadMelodiesFromServer.bind(this)
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
  }

  handleShowNewForm() {
    this.setState({showForm: false})
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
        <AdminSeasonMelodyNewField season_id={this.props.season_id} handleLoadMelodies={this.loadMelodiesFromServer} />
      </div>
    )
  }
}

AdminAnimeSeasonMelodies.propTypes = {
  season_id: PropTypes.number.isRequired
}
