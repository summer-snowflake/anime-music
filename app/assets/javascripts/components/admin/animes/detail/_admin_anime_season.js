import React, { Component, PropTypes } from 'react'

export default class AdminAnimeSeason extends Component {
  render() {
    return (
      <div className='adminAnimeSeasonComponent'>
        {this.props.season.phase}
      </div>
    )
  }
}

AdminAnimeSeason.propTypes = {
  season: PropTypes.object.isRequired
}
