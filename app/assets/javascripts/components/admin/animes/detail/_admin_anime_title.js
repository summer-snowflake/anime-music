import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

export default class AdminAnimeTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingTitle: false,
      title: this.props.title,
      unsaved_title: this.props.title
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleClickEditTitleIcon = this.handleClickEditTitleIcon.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClickEditTitleIcon() {
    this.setState({editingTitle: true, unsaved_title: (this.state.unsaved_title || this.props.title)})
  }

  handleChangeTitle(e) {
    this.setState({unsaved_title: e.target.value})
  }

  handleSubmit(e) {
    const params = { anime: { title: this.state.unsaved_title }}
    fetch(origin + 'api/admin/animes/' + this.props.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then((res) => {
        if(res.status == 422) {
          this.setState({editingTitle: true, title: ''})
        } else {
          this.setState({editingTitle: false, title: this.state.unsaved_title})
        }
      })
      .catch((error) => {
      })
    e.preventDefault()
  }

  handleBlur() {
    this.setState({editingTitle: false, unsaved_title: this.state.unsaved_title})
  }

  render() {
    let editing_jsx = (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <input autoFocus className='form-control' defaultValue={this.state.unsaved_title || this.props.title} onBlur={this.handleBlur} onChange={this.handleChangeTitle} type='text' />
      </form>
    )

    let not_editing_jsx = (
      <div className='notEditingTitle'>
        {this.state.title || this.props.title}
        <span className='right-icon' onClick={this.handleClickEditTitleIcon}>
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
      </div>
    )
  }
}

AdminAnimeTitle.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}
