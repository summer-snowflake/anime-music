import React, { Component, PropTypes } from 'react'
import AdminSeasonMelodyForm from './_admin_season_melody_form'
import DestroyModal from './../../../../../common/_destroy_modal'
import { origin } from './../../../../../../origin.js'

export default class AdminSeasonMelodyEditField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      message_type: 'success',
      message: ''
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickDeleteCancelButton = this.handleClickDeleteCancelButton.bind(this)
    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this)
  }

  handleClickTrashIcon() {
    this.setState({showModal: true}) 
  }

  handleClickDeleteCancelButton() {
    this.setState({showModal: false}) 
  }

  handleClickCancelButton() {
    this.props.onCloseEditMelodyField(this.props.melody.id)
  }

  handleClickSubmitButton(params) {
    this.postAnimeSeasonMelodyAgainsServer(params)
  }

  handleClickDeleteButton() {
    fetch(origin + 'api/admin/seasons/' + this.props.melody.season_id + '/melodies/' + this.props.melody.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      }
    })
      .then((res) => {
        if(res.status == '200') {
          this.setState({showModal: false})
          this.props.handleLoadMelodies()
        } else {
          alert('削除できませんでした')
        }
      })
      .catch((error) => {
        console.log(error)
      })
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
            <AdminSeasonMelodyForm melody={this.props.melody} onClose={this.handleClickCancelButton} onSubmit={this.handleClickSubmitButton} ref='form' season_id={this.props.melody.season_id} />
            <div className='pull-right'>
              <span className='link' onClick={this.handleClickTrashIcon}>
                <span className='glyphicon glyphicon-trash' />
              </span>
            </div>
            <DestroyModal handleCancel={this.handleClickDeleteCancelButton} handleDestroy={this.handleClickDeleteButton} showModal={this.state.showModal} />
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
  onCloseEditMelodyField: PropTypes.func.isRequired
}
