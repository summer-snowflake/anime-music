import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
      disabled: this.refs.form.refs.disabled.checked,
      start_on: this.refs.form.refs.start_on.value,
      end_on: this.refs.form.refs.end_on.value,
      phase: this.refs.form.refs.phase.value,
      previous_name: this.refs.form.refs.previous_name.value,
      behind_name: this.refs.form.refs.behind_name.value
    }}
    this.postAnimeSeasonAgainstServer(params)
  }

  postAnimeSeasonAgainstServer(params) {
    fetch(origin + 'api/admin/animes/' + this.props.anime_id + '/seasons', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '201') {
          let behind_name = ''
          let previous_name = ''
          if(this.refs.form.refs.previous_name.value) {
            previous_name = '「' + this.refs.form.refs.previous_name.value + '」'
          }
          if(this.refs.form.refs.behind_name.value) {
            behind_name = '「' + this.refs.form.refs.behind_name.value + '」'
          }
          this.setState({
            showForm: false,
            message_type: 'success',
            message: previous_name + behind_name + '登録しました'
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
    let field_status = this.state.showForm ? 'opened' : 'closed'
    return (
      <div className={'adminAnimeSeasonNewFieldComponent new-form-field ' + field_status}>
        {this.state.showForm ? (
          <AdminAnimeSeasonForm anime_id={this.props.anime_id} anime_title={this.props.anime_title} onClose={this.handleClickCancelButton} onSubmit={this.handleClickSubmitButton} ref='form' />
          ) : (
          <AdminNewButtonField message={this.state.message} message_type={this.state.message_type} name='シーズン' onLoadNewForm={this.handleShowNewForm} />
          )}
      </div>
    )
  }
}

AdminAnimeSeasonNewField.propTypes = {
  anime_id: PropTypes.string.isRequired,
  anime_title: PropTypes.string,
  handleLoadSeasons: PropTypes.func.isRequired
}
