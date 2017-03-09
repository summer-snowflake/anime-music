import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'
import LoadingImage from './../../../common/_loading_image'
import MessageBox from './../../../common/_message_box'

export default class AdminAnimeBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingBody: false,
      loadingBody: false,
      unsaved_summary: this.props.summary,
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
    this.updateSuccess = this.updateSuccess.bind(this)
    this.updateFailed = this.updateFailed.bind(this)
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
    this.props.handleUpdateBody({summary: this.state.unsaved_summary, wiki_url: this.state.unsaved_wiki_url})
  }

  updateSuccess() {
    this.setState({
      editingBody: false,
      loadingBody: false,
      message_type: 'success',
      message: '更新しました'
    })
    setTimeout(this.handleTimeout, 2000)
  }

  updateFailed(message) {
    this.setState({
      loadingBody: false,
      message_type: 'danger',
      message: message
    })
    setTimeout(this.handleTimeout, 2000)
  }

  render() {
    let editing_jsx = (
      <div className='editing-body'>
        <div className='summary'>
          <textarea autoFocus className='form-control' defaultValue={this.state.unsaved_summary || this.props.summary} disabled={this.state.loadingBody} name='summary' onChange={this.handleChangeSummary} rows='4' />
        </div>
        <div className='wiki-url'>
          <input className='form-control' defaultValue={this.state.unsaved_wiki_url || this.props.wiki_url} disabled={this.state.loadingBody} name='wiki-url' onChange={this.handleChangeWikiUrl} type='text' />
        </div>
        <div className='pull-right'>
          <LoadingImage loading={this.state.loadingBody} />
          <button className='btn btn-default' disabled={this.state.loadingBody} onClick={this.handleClickSubmitButton} type='submit'>
            {'更新'}
          </button>
          <button className='btn btn-default cancel-button' disabled={this.state.loadingBody} onClick={this.handleClickCancelButton} type='submit'>
            {'キャンセル'}
          </button>
        </div>
      </div>
    )

    const htmlString = { __html: this.props.summary.replace(/\r?\n/g, '<br>') }
    let not_editing_jsx = (
      <div className='not-editing-body'>
        <div className='summary'>
          <div dangerouslySetInnerHTML={htmlString} />
        </div>
        <div className='wiki-url'>
          <a href={this.props.wiki_url} target='_blank'>{this.props.wiki_url}</a>
        </div>
        <div className='pull-right'>
          <span className='link' onClick={this.handleClickEditButton}>
            <span className='glyphicon glyphicon-pencil' />
          </span>
        </div>
        <MessageBox message={this.state.message} message_type={this.state.message_type} />
      </div>
    )

    return (
      <div className='adminAnimeBodyComponent'>
        {this.state.editingBody ? (
          editing_jsx
        ) : (
          not_editing_jsx
        )}
      </div>
    )
  }
}

AdminAnimeBody.propTypes = {
  summary: PropTypes.string.isRequired,
  wiki_url: PropTypes.string.isRequired,
  handleUpdateBody: PropTypes.func.isRequired
}
