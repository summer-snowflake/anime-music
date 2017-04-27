import React, { Component, PropTypes } from 'react'

export default class AdminAnimeSeasonMelody extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='adminAnimeSeasonMelodyComponent'>
        <div className='label label-info kind-label'>
          {this.props.melody.kind.toUpperCase()}
          <div className='pull-right'>
            <span className='link' onClick={this.handleClickTrashIcon}>
              <span className='glyphicon glyphicon-pencil' />
            </span>
          </div>
        </div>

        <div className='title'>
          <span className='glyphicon glyphicon-music' />
          {this.props.melody.title}
        </div>
      </div>
    )
  }
}

AdminAnimeSeasonMelody.propTypes = {
  melody: PropTypes.object.isRequired
}
