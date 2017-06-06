import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Melody from './_melody'

export default class Season extends Component {
  constructor(props) {
    super(props)
    this.handleClickPR = this.handleClickPR.bind(this)
  }

  handleClickPR() {
    this.props.onDisplayAdvertisements(this.props.season.id)
  }

  render () {
    const summary = { __html: this.props.season.anime.summary.replace(/\r?\n/g, '<br>') }
    return (
      <div className='seasonComponent' id={'season-' + this.props.season.id}>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <h2 className='title'>
              <span>{this.props.season.anime_title}</span>
            </h2>
            <div>
              {this.props.season.anime.thumbnail ? (
                <div className='thumbnail'>
                  <img alt={this.props.season.anime.title} className='img-rounded' src={this.props.season.anime.thumbnail} />
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
            {this.props.season.melodies.length > 0 ? (
              <hr className='clear' />
            ) : (
              null
            )}
            {this.props.season.melodies.map((melody) =>
              <Melody key={melody.id} melody={melody} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

Season.propTypes = {
  season: PropTypes.object.isRequired,
  onDisplayAdvertisements: PropTypes.func.isRequired
}
