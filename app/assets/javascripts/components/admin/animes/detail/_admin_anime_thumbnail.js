import React, { Component, PropTypes } from 'react'

export default class AdminAnimeThumbnail extends Component {
  render() {
    return (
      <div className='adminAnimeThumbnailComponent'>
        <div className='col-xs-6 col-md-3'>
          <span className='thumbnail'>
            {this.props.picture ? (
              <img alt={this.props.title} src={this.props.picture} />
            ) : (
              <span className='no-image'>{'NO IMAGE'}</span>
            )}
          </span>
        </div>
      </div>
    )
  }
}

AdminAnimeThumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  handleUpdateThumbnail: PropTypes.func.isRequired
}
