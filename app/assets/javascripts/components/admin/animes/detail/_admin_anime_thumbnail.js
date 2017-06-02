import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MessageBox from './../../../common/_message_box'

export default class AdminAnimeThumbnail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message_type: 'success',
      message: ''
    }
    this.handleClickUploadIcon = this.handleClickUploadIcon.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.uploadSuccess = this.uploadSuccess.bind(this)
    this.uploadFailed = this.uploadFailed.bind(this)
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleClickUploadIcon() {
    this.refs.file.click()
  }

  handleChangeFile(e) {
    if(e.target.files[0] != undefined) {
      let formData = new FormData()
      formData.append('picture', e.target.files[0])
      this.uploadFile(formData)
    }
  }

  uploadFile(file) {
    this.props.handleUpdateThumbnail(file)
  }

  uploadSuccess() {
    this.setState({
      message_type: 'success',
      message: 'アップロードしました'
    })
    setTimeout(this.handleTimeout, 2000)
  }

  uploadFailed(message) {
    this.setState({
      message_type: 'danger',
      message: message
    })
    setTimeout(this.handleTimeout, 2000)
  }

  render() {
    return (
      <div className='adminAnimeThumbnailComponent'>
        <MessageBox message={this.state.message} message_type={this.state.message_type} />
        <div className='col-xs-6 col-md-3'>
          <span className='thumbnail'>
            {this.props.picture ? (
              <img alt={this.props.title} src={this.props.picture} />
            ) : (
              <div className='no-image'>
                <span>{'NO IMAGE'}</span>
                <span className='glyphicon glyphicon-picture' />
              </div>
            )}
            <span className='link glyphicon glyphicon-plus-sign' onClick={this.handleClickUploadIcon} />
          </span>
        </div>
        <input className='upload-file' onChange={this.handleChangeFile} ref='file' type='file' />
      </div>
    )
  }
}

AdminAnimeThumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string,
  handleUpdateThumbnail: PropTypes.func.isRequired
}
