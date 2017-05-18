import React, { Component, PropTypes } from 'react'
import Melody from './_melody'
import Advertisements from './_advertisements'

export default class Anime extends Component {
  render () {
    return (
      <div className='animeComponent' id={'season-' + this.props.season.id}>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <h2 className='title'>
              { this.props.season.anime.title } {this.props.season.name} {'（第'}{ this.props.season.phase }{'期）'}
            </h2>
            <p className='summary'>
              { this.props.season.anime.summary }
            </p>
            {this.props.season.melodies.length > 0 ? (
              <hr />
            ) : (
              null
            )}
            {this.props.season.melodies.map((melody) =>
              <Melody key={melody.id} melody={melody} />
            )}
            <Advertisements advertisements={this.props.season.advertisements} season_id={this.props.season.id} />
          </div>
        </div>
      </div>
    )
  }
}

Anime.propTypes = {
  season: PropTypes.object.isRequired
}
