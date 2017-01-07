import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

export default class AdminAnimeTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingTitle: false,
      title: this.props.title
    }
    this.handleClickEditTitleIcon = this.handleClickEditTitleIcon.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClickEditTitleIcon() {
    this.setState({editingTitle: true})
  }

  handleChangeTitle(e) {
    this.setState({title: e.target.value})
  }

  handleSubmit() {
    const params = { anime: { title: this.state.title }}
    fetch(origin + 'api/admin/animes/' + this.props.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then((res) => {
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    let editing_jsx = (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <input className='form-control' defaultValue={this.props.title} onChange={this.handleChangeTitle} type='text' />
      </form>
    )

    let not_editing_jsx = (
      <div className='notEditingTitle'>
        {this.props.title}
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
