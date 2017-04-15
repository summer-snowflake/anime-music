import React, { Component, PropTypes } from 'react'

import MessageBox from './../../../common/_message_box'
import LoadingImage from './../../../common/_loading_image'

export default class AdminAnimeTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingTitle: false,
      loadingTitle: false,
      unsaved_title: this.props.title,
      message_type: 'success',
      message: ''
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleClickEditTitleIcon = this.handleClickEditTitleIcon.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.updateSuccess = this.updateSuccess.bind(this)
    this.updateFailed = this.updateFailed.bind(this)
  }

  handleClickEditTitleIcon() {
    this.setState({editingTitle: true, unsaved_title: (this.state.unsaved_title || this.props.title)})
  }

  handleChangeTitle(e) {
    this.setState({unsaved_title: e.target.value})
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({loadingTitle: true})
    this.props.handleUpdateTitle({title: this.state.unsaved_title})
  }

  handleBlur() {
    if (this.state.loadingTitle) {
      this.setState({editingTitle: true, unsaved_title: this.state.unsaved_title})
    } else {
      this.setState({editingTitle: false, unsaved_title: this.state.unsaved_title})
    }
  }

  updateSuccess() {
    this.setState({
      editingTitle: false,
      loadingTitle: false,
      message_type: 'success',
      message: '更新しました'
    })  
    setTimeout(this.handleTimeout, 2000)
  }

  updateFailed(message) {
    this.setState({
      loadingTitle: false,
      message_type: 'danger',
      message: message
    })  
    setTimeout(this.handleTimeout, 2000)
  }

  render() {
    let editing_jsx = (
      <div className='editing-title'>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <input autoFocus className='form-control' defaultValue={this.state.unsaved_title || this.props.title} disabled={this.state.loadingTitle} name='title' onBlur={this.handleBlur} onChange={this.handleChangeTitle} ref='title' type='text' />
        </form>
      </div>
    )

    let not_editing_jsx = (
      <div className='not-editing-title'>
        <b className='panel-title'>{this.props.title}</b>
        <span className='link right-icon' onClick={this.handleClickEditTitleIcon}>
          <span className='glyphicon glyphicon-pencil' />
        </span>
      </div>
    )

    return (
      <div className='adminAnimeTitleComponent'>
        {(() => {
          if (this.state.editingTitle)
            return editing_jsx
          else
            return not_editing_jsx
        })()}
        <MessageBox message={this.state.message} message_type={this.state.message_type} />
        <LoadingImage loading={this.state.loadingTitle} />
        {(() => {
          if (this.props.airing)
            return <span className='pull-right label label-default airing-label'>{'放送中'}</span>
        })()}
      </div>
    )
  }
}

AdminAnimeTitle.propTypes = {
  title: PropTypes.string.isRequired,
  airing: PropTypes.bool.isRequired,
  handleUpdateTitle: PropTypes.func.isRequired
}
