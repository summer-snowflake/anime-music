import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Modal } from 'react-bootstrap'
import { origin } from './../../../../origin.js'
import DestroyModal from './../../../common/_destroy_modal'

export default class AdminActorRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this)
  }

  handleClickTrashIcon() {
    this.setState({showModal: true})
  }

  handleClickCancelButton() {
    this.setState({showModal: false})
  }

  handleClickDeleteButton() {
    fetch(origin + 'api/admin/actors/' + this.props.actor.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
        <DestroyModal showModal={this.state.showModal} closeModal={this.handleClickCancelButton} submitModal={this.handleClickDeleteButton} />
      </div>
    )
  }
}

AdminActorRow.propTypes = {
  actor: PropTypes.object.isRequired,
  handleLoad: PropTypes.func.isRequired
}
