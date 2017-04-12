import React, { Component, PropTypes } from 'react'

export default class Anime extends Component {
  render () {
    return (
      <div className='animeComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <div className='title'>
              { this.props.season.anime.title } {this.props.season.name} {'（第'}{ this.props.season.phase }{'期）'}
            </div>
            <div className='summary'>
              { this.props.season.anime.summary }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Anime.propTypes = {
  season: PropTypes.object.isRequired
}
