import React, { Component, PropTypes } from 'react'

export default class Anime extends Component {
  render () {
    return (
      <div className='animeComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <div className='title'>
              { this.props.anime.title }
            </div>
            <div className='summary'>
              { this.props.anime.summary }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Anime.propTypes = {
  anime: PropTypes.object.isRequired
}
