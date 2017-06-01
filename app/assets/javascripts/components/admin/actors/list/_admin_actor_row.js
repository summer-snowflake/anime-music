import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router'
import { origin } from './../../../../origin.js'
import DestroyModal from './../../../common/_destroy_modal'

export default class AdminActorRow extends Component {
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
    fetch(origin + 'api/admin/actors/' + this.props.actor.id, {
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
          this.props.handleLoad()
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
      <div className='adminActorRowComponent media' id={'actor-' + this.props.actor.id}>
        <div className='media-body'>
          <div className='media-heading name'>
            <Link to={'/admin/actors/' + this.props.actor.id}>{this.props.actor.name}</Link>
          </div>
        </div>
        <div className='media-right'>
          <div className='pull-right'>
            <span className='glyphicon glyphicon-trash link' onClick={this.handleClickTrashIcon} />
          </div>
        </div>
        <DestroyModal handleCancel={this.onClickCancelButton} handleDestroy={this.onClickDeleteButton} showModal={this.state.showModal} />
      </div>
    )
  }
}

AdminActorRow.propTypes = {
  actor: PropTypes.object.isRequired,
  handleLoad: PropTypes.func.isRequired
}
