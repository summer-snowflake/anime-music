import React, { Component, PropTypes } from 'react'
import AdminNewButtonField from './../../../../_admin_new_button_field'
import AdminSeasonMelodyForm from './_admin_season_melody_form'
import { origin } from './../../../../../../origin.js'

export default class AdminSeasonMelodyEditField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message_type: 'success',
      message: ''
    }
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleClickCancelButton() {
    this.props.handleCloseEditMelodyField(this.props.melody.id)
  }

  handleClickSubmitButton(params) {
    this.postAnimeSeasonMelodyAgainsServer(params)
  }

  postAnimeSeasonMelodyAgainsServer(params) {
    fetch(origin + 'api/admin/seasons/' + this.props.melody.season_id + '/melodies/' + this.props.melody.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },  
      body: JSON.stringify(params)
    })  
      .then((res) => {
        if(res.status == '200') {
          this.props.handleLoadMelodies()
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
      <div>
        {this.props.melody.showEditForm ? (
          <div className='adminSeasonMelodyEditFieldComponent new-form-field'>
            <AdminSeasonMelodyForm onClose={this.handleClickCancelButton} melody={this.props.melody} onSubmit={this.handleClickSubmitButton} ref='form' season_id={this.props.melody.season_id} />
          </div>
          ) : (
            null
          )}
      </div>
    )
  }
}

AdminSeasonMelodyEditField.propTypes = {
  melody: PropTypes.object.isRequired,
  handleLoadMelodies: PropTypes.func.isRequired,
  handleCloseEditMelodyField: PropTypes.func.isRequired
}
