import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Anime extends Component {
  constructor(props) {
    super(props)
    this.handleClickPR = this.handleClickPR.bind(this)
  }

  handleClickPR() {
    this.props.onClickPR()
  }

  render () {
    const summary = { __html: this.props.anime.summary.replace(/\r?\n/g, '<br>') }
    return (
      <div className='animeComponent' id={'anime-' + this.props.anime.id}>
        {this.props.title ? (
          <h2 className='title'>
            <span>{this.props.title}</span>
          </h2>
        ) : (
          null
        )}
        <div>
          {this.props.anime.thumbnail ? (
            <div className='thumbnail'>
              <img alt={this.props.anime.title} className='img-rounded' src={this.props.anime.thumbnail} />
            </div>
          ) : (
            null
          )}
          <div className='summary'>
            <div dangerouslySetInnerHTML={summary} />
          </div>
          <p className='pull-right'>
            <span className='label label-default link' onClick={this.handleClickPR}>
              {'PR'}
              <span className='glyphicon glyphicon-refresh' />
            </span>
          </p>
        </div>
      </div>
    )
  }
}

Anime.propTypes = {
  anime: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClickPR: PropTypes.func.isRequired
}
