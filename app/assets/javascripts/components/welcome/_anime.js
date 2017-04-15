import React, { Component, PropTypes } from 'react'
import Melody from './_melody'

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
            {this.props.season.melodies.map((melody) =>
              <Melody key={melody.id} melody={melody} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

Anime.propTypes = {
  season: PropTypes.object.isRequired
}
