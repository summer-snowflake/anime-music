import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'

export default class MovieModal extends Component {
  constructor(props) {
    super(props)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
  }

  handleClickCancelButton() {
    this.props.onClickCloseButton()
  }

  render () {
    return (
      <div className='movieModalComponent'>
        <Modal show={this.props.showModal}>
          <Modal.Body dangerouslySetInnerHTML={{__html: this.props.youtube}} id='movie' />
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

MovieModal.propTypes = {
  onClickCloseButton: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  youtube: PropTypes.string.isRequired
}
