import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { origin } from './../../../../../origin.js'
import DestroyModal from './../../../../common/_destroy_modal'

export default class AdminAnimeAdvertisement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickCancelButton = this.onClickCancelButton.bind(this)
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this)
  }

  handleClickTrashIcon() {
    this.setState({showModal: true}) 
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

  render() {
    return (
      <div className='adminAnimeAdvertisementComponent media' id={'advertisement-' + this.props.advertisement.id}>
        <span className='label label-default' id='tag-name'>{this.props.advertisement.tag_name}</span>
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
