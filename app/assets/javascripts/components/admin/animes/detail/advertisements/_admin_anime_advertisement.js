import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../origin.js'
import DestroyModal from './../../../../common/_destroy_modal'

export default class AdminAnimeAdvertisement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      message_type: 'success',
      message: ''
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickCancelButton = this.onClickCancelButton.bind(this)
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this)
  }

  handleClickEditIcon() {
    this.setState({showForm: true})
  }

  handleClickTrashIcon() {
    this.setState({showModal: true}) 
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleClickSubmitButton() {
    let params = {
      season: {
        phase: this.refs.form.refs.phase.value,
        name: this.refs.form.refs.name.value,
        start_on: this.refs.form.refs.start_on.value,
        end_on: this.refs.form.refs.end_on.value
      }
    }
    this.updateAnimeSeasonAgainstServer(params)
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  onClickCancelButton() {
    this.setState({showModal: false})
  }

  onClickDeleteButton() {
    fetch(origin + 'api/admin/advertisements/' + this.props.advertisement.id, {
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
          this.props.handleLoadAdvertisements()
        } else {
          alert('削除できませんでした')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  updateAnimeSeasonAgainstServer(params) {
    fetch(origin + 'api/admin/animes/' + this.props.season.anime_id + '/seasons/' + this.props.season.id, {
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
          this.setState({showForm: false, message_type: 'success', message: '更新しました'})
          setTimeout(this.handleTimeout, 2000)
          this.loadAnimeSeasonFromServer()
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

  loadAnimeSeasonFromServer() {
    fetch(origin + 'api/admin/animes/' + this.props.season.anime_id + '/seasons/' + this.props.season.id, {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({season: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }
 
  render() {
    return (
      <div className='adminAnimeAdvertisementComponent media' id={'advertisement-' + this.props.advertisement.id}>
        <div className='body' dangerouslySetInnerHTML={{__html: this.props.advertisement.body}} />
        <span className='glyphicon glyphicon-trash link pull-right' onClick={this.handleClickTrashIcon} />
        <DestroyModal handleCancel={this.onClickCancelButton} handleDestroy={this.onClickDeleteButton} showModal={this.state.showModal} />
      </div>
    )
  }
}

AdminAnimeAdvertisement.propTypes = {
  advertisement: PropTypes.object.isRequired,
  handleLoadAdvertisements: PropTypes.func.isRequired
}
