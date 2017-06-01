import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class LoadingImage extends Component {
  render () {
    return (
      <div className='loadingImageComponent'>
        {(this.props.loading) ? (
          <div>{'Loading...'}</div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

LoadingImage.propTypes = {
  loading: PropTypes.bool.isRequired
}
