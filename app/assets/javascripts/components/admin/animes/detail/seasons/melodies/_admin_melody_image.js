import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AdminMelodyImage extends Component {
  constructor(props) {
    super(props)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
  }

  handleClickTrashIcon() {
    this.props.handleDeleteMelodyImage(this.props.melody_image.id)
  }

  render () {
    return (
      <div className='adminMelodyImageComponent'>
        <img className='img-thumbnail exist-image' key={this.props.melody_image.id} src={this.props.melody_image.picture} />
        <span className='glyphicon glyphicon-trash link pull-right' onClick={this.handleClickTrashIcon} />
      </div>
    )
  }
}

AdminMelodyImage.propTypes = {
  melody_image: PropTypes.object.isRequired,
  handleDeleteMelodyImage: PropTypes.func.isRequired
}
