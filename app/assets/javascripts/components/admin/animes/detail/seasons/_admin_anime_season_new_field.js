import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../origin.js'
import AdminNewButtonField from './../../../_admin_new_button_field'
import AdminAnimeSeasonForm from './_admin_anime_season_form'

export default class AdminAnimeSeasonNewField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      unsaved_start_on: '',
      unsaved_end_on: '',
      unsaved_phase: '',
      unsaved_name: '',
      message_type: 'success',
      message: ''
    }
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
    this.postAnimeSeasonAgainstServer = this.postAnimeSeasonAgainstServer.bind(this)
  }

  handleShowNewForm() {
    this.setState({showForm: true})
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleClickSubmitButton() {
    const params = { season: {
      start_on: this.refs.form.refs.start_on.value,
      end_on: this.refs.form.refs.end_on.value,
      phase: this.refs.form.refs.phase.value,
      name: this.refs.form.refs.name.value
    }}
    this.postAnimeSeasonAgainstServer(params)
  }

  postAnimeSeasonAgainstServer(params) {
    fetch(origin + 'api/admin/animes/' + this.props.anime_id + '/seasons', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '201') {
          let name = ''
          if(this.refs.form.refs.name.value) {
            name = '「' + this.refs.form.refs.name.value + '」を'
          }
          this.setState({
            showForm: false,
            message_type: 'success',
            message: name + '登録しました'
          })
          setTimeout(this.handleTimeout, 2000)
          this.props.handleLoadSeasons()
        } else {
          res.json().then((json) => {
            this.refs.form.updateFailed(json.error_messages[0])
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='adminAnimeSeasonNewFormComponent new-form-field'>
        {this.state.showForm ? (
          <AdminAnimeSeasonForm anime_id={this.props.anime_id} close={this.handleClickCancelButton} handleSubmit={this.handleClickSubmitButton} ref='form' />
          ) : (
          <AdminNewButtonField message={this.state.message} message_type={this.state.message_type} onLoadNewForm={this.handleShowNewForm} />
          )}
      </div>
    )
  }
}

AdminAnimeSeasonNewField.propTypes = {
  anime_id: PropTypes.string.isRequired,
  handleLoadSeasons: PropTypes.func.isRequired
}
