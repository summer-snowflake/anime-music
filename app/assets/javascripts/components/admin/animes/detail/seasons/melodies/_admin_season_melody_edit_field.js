import React, { Component, PropTypes } from 'react'
import AdminNewButtonField from './../../../../_admin_new_button_field'
import AdminSeasonMelodyForm from './_admin_season_melody_form'
import { origin } from './../../../../../../origin.js'

export default class AdminSeasonMelodyEditField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      message_type: 'success',
      message: ''
    }
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
  }

  handleClickCancelButton() {
    this.props.handleCloseEditMelodyField(this.props.melody.id)
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleClickSubmitButton() {
    const params = { melody: {
      kind: this.refs.form.refs.kind.value.toLowerCase(),
      title: this.refs.form.refs.title.value
    }}
    this.postAnimeSeasonMelodyAgainsServer(params)
  }

  postAnimeSeasonMelodyAgainsServer(params) {
    fetch(origin + 'api/admin/seasons/' + this.props.season_id + '/melodies', {
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
          let title = ''
          if(this.refs.form.refs.title.value) {
            title = '「' + this.refs.form.refs.title.value + '」を'
          }
          this.setState({
            showForm: false,
            message_type: 'success',
            message: title + '登録しました'
          })  
          setTimeout(this.handleTimeout, 2000)
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
