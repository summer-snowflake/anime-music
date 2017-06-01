import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

export default class DestroyModal extends Component {
  constructor(props) {
    super(props)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this)
  }

  handleClickDeleteButton() {
    this.props.handleDestroy()
  }

  handleClickCancelButton() {
    this.props.handleCancel()
  }

  render () {
    return (
      <div className='destroyModalComponent'>
        <Modal show={this.props.showModal}>
          <Modal.Body>{'削除しますか？'}</Modal.Body>
          <Modal.Footer>
            <a className='btn btn-danger animate-button' onClick={this.handleClickDeleteButton}>
              {'はい'}
            </a>
            <a className='btn btn-default' onClick={this.handleClickCancelButton}>
              {'いいえ'}
            </a>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

DestroyModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDestroy: PropTypes.func.isRequired
}
