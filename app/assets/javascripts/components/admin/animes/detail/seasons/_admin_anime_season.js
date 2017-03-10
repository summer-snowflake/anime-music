import React, { Component, PropTypes } from 'react'

export default class AdminAnimeSeason extends Component {
  render() {
    return (
      <div className='adminAnimeSeasonComponent'>
        <div className='well well-lg'>
          {'第' + this.props.season.phase + '期：'}
          {this.props.season.start_on + '〜' + this.props.season.end_on + '：'}
          <b>{this.props.season.name}</b>
        </div>
      </div>
    )
  }
}

AdminAnimeSeason.propTypes = {
  season: PropTypes.object.isRequired
}
