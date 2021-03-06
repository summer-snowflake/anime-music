import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Anime from './_anime'
import Melody from './_melody'

export default class Season extends Component {
  constructor(props) {
    super(props)
    this.handleClickPR = this.handleClickPR.bind(this)
  }

  handleClickPR() {
    this.props.onDisplayAdvertisement(this.props.season.anime.id)
  }

  render () {
    return (
      <div className='seasonComponent' id={'season-' + this.props.season.id}>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <Anime anime={this.props.season.anime} onClickPR={this.handleClickPR} title={this.props.season.anime_title} />
            {this.props.season.melodies.length > 0 ? (
              <hr className='clear' />
            ) : (
              null
            )}
            <table className='table'>
              {this.props.season.melodies.map((melody) =>
                <Melody key={melody.id} melody={melody} />
              )}
            </table>
          </div>
        </div>
      </div>
    )
  }
}

Season.propTypes = {
  season: PropTypes.object.isRequired,
  onDisplayAdvertisement: PropTypes.func.isRequired
}
