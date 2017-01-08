import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

export default class AdminAnimeSeason extends Component {
  constructor(props) {
    super(props)
  }

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
