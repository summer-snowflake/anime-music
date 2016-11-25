import React, { Component, PropTypes } from 'react'

export default class Anime extends Component {
  render () {
    return (
      <div className='panel panel-default anime-title'>
        <div className='panel-body'>
          { this.props.anime.title }
        </div>
      </div>
    )
  }
}

Anime.propTypes = {
  anime: PropTypes.object.isRequired
}
