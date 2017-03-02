import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Modal } from 'react-bootstrap'
import { origin } from './../../../../origin.js'

export default class AdminAnimeRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this)
  }

  handleClickTrashIcon() {
    this.setState({showModal: true})
  }

  handleClickCancelButton() {
    this.setState({showModal: false})
  }

  handleClickDeleteButton() {
    fetch(origin + 'api/admin/animes/' + this.props.anime.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if(res.status == '200') {
          this.setState({showModal: false})
          this.props.handleLoad()
        } else {
          alert('削除できませんでした')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    let modal_jsx = (
      <Modal show={this.state.showModal}>
        <Modal.Body>{'削除しますか？'}</Modal.Body>
        <Modal.Footer>
          <a className='btn btn-danger animate-button' onClick={this.handleClickDeleteButton}>
            {'はい'}
          </a>
          <a className='btn btn-default' onClick={this.handleClickCancelButton}>
            {'いいえ'}
          </a>
        </Modal.Footer>
      </Modal>
    )

    return (
      <div className='media adminAnimeRowComponent' id={'anime-' + this.props.anime.id}>
        <div className='media-left'>
          <Link to={'/admin/animes/' + this.props.anime.id}>
            {this.props.anime.picture ? (
              <img alt={this.props.anime.title} className='media-object' src={this.props.anime.picture} />
            ) : (
              <span className='media-object no-image'>{'NO IMAGE'}</span>
            )}
          </Link>
        </div>
        <div className='media-body'>
          <h4 className='media-heading'>
            <Link to={'/admin/animes/' + this.props.anime.id}>
              {this.props.anime.title}
            </Link>
          </h4>
          <div className='summary'>
            {this.props.anime.summary}
          </div>
          <div className='wiki-url'>
            <a href={this.props.anime.wiki_url} target='_blank'>{this.props.anime.wiki_url}</a>
          </div>
        </div>
        <div className='media-right'>
          <div className='pull-right'>
            <span className='glyphicon glyphicon-trash link' onClick={this.handleClickTrashIcon} />
          </div>
        </div>
        {modal_jsx}
      </div>
    )
  }
}

AdminAnimeRow.propTypes = {
  anime: PropTypes.object.isRequired,
  handleLoad: PropTypes.func.isRequired
}
