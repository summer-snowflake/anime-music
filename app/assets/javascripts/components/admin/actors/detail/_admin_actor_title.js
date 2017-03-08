import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

import MessageBox from './../../../common/_message_box'
import LoadingImage from './../../../common/_loading_image'

export default class AdminActorTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingTitle: false,
      loadingTitle: false,
      unsaved_name: this.props.name,
      message_type: 'success',
      message: ''
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleClickEditTitleIcon = this.handleClickEditTitleIcon.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.updateSuccess = this.updateSuccess.bind(this)
  }

  handleClickEditTitleIcon() {
    this.setState({
      editingTitle: true,
      unsaved_name: (this.state.unsaved_name || this.props.name)
    })
  }

  handleChangeTitle(e) {
    this.setState({unsaved_name: e.target.value})
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({loadingTitle: true})
    this.props.handleUpdateName({name: this.state.unsaved_name})
  }

  handleBlur() {
    if (this.state.loadingTitle) {
      this.setState({editingTitle: true, unsaved_name: this.state.unsaved_name})
    } else {
      this.setState({editingTitle: false, unsaved_name: this.state.unsaved_name})
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
          <input autoFocus className='form-control' defaultValue={this.state.unsaved_name || this.props.name} disabled={this.state.loadingTitle} name='name' onBlur={this.handleBlur} onChange={this.handleChangeTitle} ref='name' type='text' />
        </form>
      </div>
    )

    let not_editing_jsx = (
      <div className='not-editing-title'>
        <b className='panel-title'>{this.props.name}</b>
        <span className='link right-icon' onClick={this.handleClickEditTitleIcon}>
          <span className='glyphicon glyphicon-pencil' />
        </span>
      </div>
    )

    return (
      <div className='adminActorTitleComponent'>
        {(() => {
          if (this.state.editingTitle)
            return editing_jsx
          else
            return not_editing_jsx
        })()}
        <MessageBox message={this.state.message} message_type={this.state.message_type} />
        <LoadingImage loading={this.state.loadingTitle} />
      </div>
    )
  }
}

AdminActorTitle.propTypes = {
  name: PropTypes.string.isRequired,
  handleUpdateName: PropTypes.func.isRequired
}
