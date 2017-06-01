import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class AdvertisementModal extends Component {
  constructor(props) {
    super(props)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
  }

  handleClickCancelButton() {
    this.props.onClickCloseButton()
  }

  render () {
    return (
      <div className='advertisementModalComponent'>
        <Modal show={this.props.showModal}>
          <Modal.Body dangerouslySetInnerHTML={{__html: this.props.body}} id='advertisement' />
          <Modal.Footer>
            <a className='btn btn-default' onClick={this.handleClickCancelButton}>
              {'閉じる'}
            </a>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

AdvertisementModal.propTypes = {
  onClickCloseButton: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  body: PropTypes.string.isRequired
}
