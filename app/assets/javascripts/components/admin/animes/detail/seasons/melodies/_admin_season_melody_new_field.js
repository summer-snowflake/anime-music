import React, { Component, PropTypes } from 'react'
import AdminAnimeSeasonMelody from './_admin_anime_season_melody'
import AdminNewButtonField from './../../../../_admin_new_button_field'
import AdminSeasonMelodyForm from './_admin_season_melody_form'
import { origin } from './../../../../../../origin.js'

export default class AdminSeasonMelodyNewField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      message_type: 'success',
      message: ''
    }
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
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
      <div className='adminSeasonMelodyNewFieldComponent new-form-field'>
        {this.state.showForm ? (
          <AdminSeasonMelodyForm season_id={this.props.season_id} onClose={this.handleClickCancelButton} onSubmit={this.handleClickSubmitButton} ref='form' />
        ) : (
          <AdminNewButtonField message={this.state.message} message_type={this.state.message_type} name='Melody' onLoadNewForm={this.handleShowNewForm} />
        )}
      </div>
    )
  }
}

AdminSeasonMelodyNewField.propTypes = {
  season_id: PropTypes.number.isRequired,
  handleLoadMelodies: PropTypes.func.isRequired
}
