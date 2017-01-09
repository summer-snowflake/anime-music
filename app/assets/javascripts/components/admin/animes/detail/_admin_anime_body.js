import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

export default class AdminAnimeBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingBody: false,
      loadingBody: false,
      summary: this.props.summary,
      unsaved_summary: this.props.summary,
      wiki_url: this.props.wiki_url,
      unsaved_wiki_url: this.props.wiki_url,
      message_type: 'success',
      message: ''
    }
    this.handleClickEditButton = this.handleClickEditButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeSummary = this.handleChangeSummary.bind(this)
    this.handleChangeWikiUrl = this.handleChangeWikiUrl.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleClickEditButton() {
    this.setState({
      editingBody: true,
      unsaved_summary: (this.state.unsaved_summary || this.props.summary),
      unsaved_wiki_url: (this.state.unsaved_wiki_url || this.props.wiki_url)
    })
  }

  handleChangeSummary(e) {
    this.setState({unsaved_summary: e.target.value})
  }

  handleChangeWikiUrl(e) {
    this.setState({unsaved_wiki_url: e.target.value})
  }

  handleClickCancelButton() {
    this.setState({editingBody: false})
  }

  handleClickSubmitButton() {
    this.setState({loadingBody: true})
    this.loadAnimeBodyFromServer()
  }

  loadAnimeBodyFromServer() {
    const params = { anime: { summary: this.state.unsaved_summary, wiki_url: this.state.unsaved_wiki_url }}
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
            editingBody: false,
            loadingBody: false,
            summary: this.state.unsaved_summary,
            wiki_url: this.state.unsaved_wiki_url,
            message_type: 'success',
            message: '更新しました'
          })
          setTimeout(this.handleTimeout, 2000)
        } else {
          this.setState({editingBody: true, summary: '', wiki_url: ''})
          res.json().then((json) => {
            this.setState({
              loadingBody: false,
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

  render() {
    let editing_jsx = (
      <div className='editing-body'>
        <div className='summary'>
          <textarea autoFocus className='form-control' defaultValue={this.state.unsaved_summary || this.props.summary} onChange={this.handleChangeSummary} rows='4' />
        </div>
        <div className='wiki-url'>
          <input className='form-control' defaultValue={this.state.unsaved_wiki_url || this.props.wiki_url} onChange={this.handleChangeWikiUrl} type='text' />
        </div>
        <div className='pull-right'>
          <button className='btn btn-default' onClick={this.handleClickSubmitButton} type='submit'>
            {'更新'}
          </button>
          <button className='btn btn-default cancel-button' onClick={this.handleClickCancelButton} type='submit'>
            {'キャンセル'}
          </button>
        </div>
      </div>
    )

    let not_editing_jsx = (
      <div className='not-editing-body'>
        <div className='summary'>
          {this.state.summary || this.props.summary}
        </div>
        <div className='wiki-url'>
          <a href={this.props.wiki_url} target='_blank'>{this.state.wiki_url || this.props.wiki_url}</a>
        </div>
        <div className='pull-right'>
          <button className='btn btn-default' onClick={this.handleClickEditButton} type='submit'>
            <span className='glyphicon glyphicon-pencil' />
          </button>
        </div>
      </div>
    )

    return (
      <div className='adminAnimeBodyComponent'>
        {(() => {
          if (this.state.editingBody)
            return editing_jsx
          else
            return not_editing_jsx
        })()}
      </div>
    )
  }
}

AdminAnimeBody.propTypes = {
  id: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  wiki_url: PropTypes.string.isRequired
}
