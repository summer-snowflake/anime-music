import React from 'react';

class Anime extends React.Component {
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

module.exports = Anime
