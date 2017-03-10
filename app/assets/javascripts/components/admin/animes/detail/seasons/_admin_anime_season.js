import React, { Component, PropTypes } from 'react'

export default class AdminAnimeSeason extends Component {
  render() {
    return (
      <div className='adminAnimeSeasonComponent media'>
        <div className='media-body'>
          <div className='media-heading'>
            {'第' + this.props.season.phase + '期：'}
            {this.props.season.name}
          </div>
          <div className='period'>
            {this.props.season.period}
          </div>
        </div>
      </div>
    )
  }
}

AdminAnimeSeason.propTypes = {
  season: PropTypes.object.isRequired
}
