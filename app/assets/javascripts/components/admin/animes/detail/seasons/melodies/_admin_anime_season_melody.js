import React, { Component, PropTypes } from 'react'

export default class AdminAnimeSeasonMelody extends Component {
  constructor(props) {
    super(props)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
  }

  handleClickEditIcon() {
    this.props.handleShowEditMelodyField(this.props.melody.id)
  }

  render() {
    return (
      <div className='adminAnimeSeasonMelodyComponent'>
        <div className='label label-info kind-label'>
          {this.props.melody.kind.toUpperCase()}
          <div className='pull-right'>
            <span className='link' onClick={this.handleClickEditIcon}>
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
  melody: PropTypes.object.isRequired,
  handleShowEditMelodyField: PropTypes.func.isRequired
}
