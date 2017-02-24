import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

import MessageBox from './../../../common/_message_box'
import LoadingImage from './../../../common/_loading_image'

export default class AdminAnimeTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingTitle: false,
      loadingTitle: false,
      title: this.props.title,
      unsaved_title: this.props.title,
      message_type: 'success',
      message: ''
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleClickEditTitleIcon = this.handleClickEditTitleIcon.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
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

  loadAnimeTitleFromServer() {
    const params = { anime: { title: this.state.unsaved_title }}
    fetch(origin + 'api/admin/animes/' + this.props.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '200') {
          this.setState({
            editingTitle: false,
            loadingTitle: false,
            title: this.state.unsaved_title,
            message_type: 'success',
            message: '更新しました'
          })
          setTimeout(this.handleTimeout, 2000)
        } else {
          this.setState({editingTitle: true, title: ''})
          res.json().then((json) => {
            this.setState({
              loadingTitle: false,
              message_type: 'danger',
              message: json.error_messages[0]
            })
            setTimeout(this.handleTimeout, 2000)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({loadingTitle: true})
    this.loadAnimeTitleFromServer()
  }

  handleBlur() {
    if (this.state.loadingTitle) {
      this.setState({editingTitle: true, unsaved_title: this.state.unsaved_title})
    } else {
      this.setState({editingTitle: false, unsaved_title: this.state.unsaved_title})
    }
  }

  render() {
    let editing_jsx = (
      <div className='editing-title'>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <input autoFocus className='form-control' defaultValue={this.state.unsaved_title || this.props.title} disabled={this.state.loadingTitle} onBlur={this.handleBlur} onChange={this.handleChangeTitle} ref='title' type='text' />
        </form>
      </div>
    )

    let not_editing_jsx = (
      <div className='not-editing-title'>
        <b className='panel-title'>{this.state.title || this.props.title}</b>
        <a href='#'>
          <span className='right-icon' onClick={this.handleClickEditTitleIcon}>
            <span className='glyphicon glyphicon-pencil' />
          </span>
        </a>
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
      </div>
    )
  }
}

AdminAnimeTitle.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}
