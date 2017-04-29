import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../../origin.js'
import AdminAnimeSeasonMelody from './_admin_anime_season_melody'
import AdminSeasonMelodyNewField from './_admin_season_melody_new_field'
import AdminSeasonMelodyEditField from './_admin_season_melody_edit_field'

export default class AdminAnimeSeasonMelodies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      melodies: [],
      showForm: false
    }
    this.loadMelodiesFromServer = this.loadMelodiesFromServer.bind(this)
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
    this.handleShowEditMelodyField = this.handleShowEditMelodyField.bind(this)
    this.handleCloseEditMelodyField = this.handleCloseEditMelodyField.bind(this)
  }

  componentDidMount() {
    this.loadMelodiesFromServer()
  }

  handleCloseEditMelodyField(melody_id) {
    for (let [index, val] in this.state.melodies) {
      if (this.state.melodies[index].id == melody_id) {
        let melodies = this.state.melodies
        melodies[index].showEditForm = false
        this.setState({melodies: melodies})
      }
    }
  }

  handleShowNewForm() {
    this.setState({showForm: false})
  }

  handleShowEditMelodyField(melody_id) {
    for (let [index, val] in this.state.melodies) {
      if (this.state.melodies[index].id == melody_id) {
        let melodies = this.state.melodies
        melodies[index].showEditForm = true
        this.setState({melodies: melodies})
      }
    }
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
          <AdminAnimeSeasonMelody key={melody.id} melody={melody} handleShowEditMelodyField={this.handleShowEditMelodyField} />
        )}
        {this.state.melodies.map((melody) =>
          <AdminSeasonMelodyEditField key={melody.id} melody={melody} handleCloseEditMelodyField={this.handleCloseEditMelodyField} handleLoadMelodies={this.loadMelodiesFromServer} />
        )}
        <AdminSeasonMelodyNewField handleLoadMelodies={this.loadMelodiesFromServer} season_id={this.props.season_id} />
      </div>
    )
  }
}

AdminAnimeSeasonMelodies.propTypes = {
  season_id: PropTypes.number.isRequired
}
