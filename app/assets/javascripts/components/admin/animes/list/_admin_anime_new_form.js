import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { origin } from './../../../../origin.js'
import MessageBox from './../../../common/_message_box'
import AdminNewButtonField from './../../_admin_new_button_field'

export default class AdminAnimeNewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      loadingForm: false,
      unsaved_title: '',
      unsaved_summary: '',
      unsaved_wiki_url: '',
      message_type: 'success',
      message: ''
    }
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeSummary = this.handleChangeSummary.bind(this)
    this.handleChangeWikiUrl = this.handleChangeWikiUrl.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
  }

  handleShowNewForm() {
    this.setState({showForm: true})
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  handleClickSubmitButton() {
    this.setState({loadingForm: true})
    this.postAnimeAgainstServer()
  }

  handleChangeTitle(e) {
    this.setState({unsaved_title: e.target.value})
  }

  handleChangeSummary(e) {
    this.setState({unsaved_summary: e.target.value})
  }

  handleChangeWikiUrl(e) {
    this.setState({unsaved_wiki_url: e.target.value})
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  postAnimeAgainstServer() {
    const params = {
      title: this.state.unsaved_title,
      summary: this.state.unsaved_summary,
      wiki_url: this.state.unsaved_wiki_url
    }
    fetch(origin + 'api/admin/animes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '201') {
          this.setState({
            showForm: false,
            loadingForm: false,
            unsaved_title: '',
            unsaved_summary: '',
            unsaved_wiki_url: '',
            message_type: 'success',
            message: '「' + this.state.unsaved_title + '」を登録しました'
          })
          this.props.handleLoad()
          setTimeout(this.handleTimeout, 2000)
        } else {
          this.setState({editingTitle: true, title: ''})
          res.json().then((json) => {
            this.setState({
              loadingForm: false,
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
    return (
      <div className='adminAnimeNewFormComponent new-form-field'>
        {this.state.showForm ? (
          <div className='media'>
            <div className='media-left'>
              <span className='media-object no-image'>{'NO IMAGE'}</span>
            </div>
            <div className='media-body non-bordered'>
              <div className='form-group title'>
                <label htmlFor='title'>{'タイトル'}</label>
                <input autoFocus className='form-control' disabled={this.state.loadingForm} id='title' name='title' onChange={this.handleChangeTitle} type='text' />
              </div>
              <div className='form-group summary'>
                <label htmlFor='summary'>{'あらすじ'}</label>
                <textarea className='form-control' disabled={this.state.loadingForm} id='summary' name='summary' onChange={this.handleChangeSummary} rows='4' />
              </div>
              <div className='form-group wiki-url'>
                <label htmlFor='wiki-url'>{'WikiのURL'}</label>
                <input className='form-control' disabled={this.state.loadingForm} name='wiki-url' onChange={this.handleChangeWikiUrl} type='text' />
              </div>

              <a className='btn btn-danger animate-button' disabled={this.state.loadingForm} onClick={this.handleClickSubmitButton} type='submit'>
                {'登録'}
              </a>
              <a className='btn btn-default cancel-button' disabled={this.state.loadingForm} onClick={this.handleClickCancelButton} type='submit'>
                {'キャンセル'}
              </a>
              <MessageBox message={this.state.message} message_type={this.state.message_type} />
            </div>
          </div>
          ) : (
          <AdminNewButtonField message={this.state.message} message_type={this.state.message_type} name='Anime' onLoadNewForm={this.handleShowNewForm} />
          )}
      </div>
    )
  }
}

AdminAnimeNewForm.propTypes = {
  handleLoad: PropTypes.func.isRequired
}
