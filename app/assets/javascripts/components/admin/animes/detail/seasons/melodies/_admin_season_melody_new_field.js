import React, { Component, PropTypes } from 'react'
import AdminAnimeSeasonMelody from './_admin_anime_season_melody'
import AdminNewButtonField from './../../../../_admin_new_button_field'
import AdminSeasonMelodyForm from './_admin_season_melody_form'

export default class AdminSeasonMelodyNewField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleShowNewForm() {
    this.setState({showForm: true})
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  handleClickSubmitButton() {
    const params = { melody: {
      title: this.refs.form.refs.title.value
    }}
    this.postAnimeSeasonMelodyAgainsServer(params)
  }

  postAnimeSeasonMelodyAgainsServer(params) {
    this.setState({showForm: false})
  }

  render() {
    return (
      <div className='adminSeasonMelodyNewFieldComponent new-form-field'>
        {this.state.showForm ? (
          <AdminSeasonMelodyForm season_id={this.props.season_id} onClose={this.handleClickCancelButton} onSubmit={this.handleClickSubmitButton} ref='form' />
        ) : (
          <AdminNewButtonField message='' message_type='' name='Melody' onLoadNewForm={this.handleShowNewForm} />
        )}
      </div>
    )
  }
}

AdminSeasonMelodyNewField.propTypes = {
  season_id: PropTypes.number.isRequired,
  handleLoadMelodies: PropTypes.func.isRequired
}
