import React, { Component } from 'react'

export default class LoadingImage extends Component {
  render () {
    return (
      <div className='loadingImageComponent'>
        {(this.props.loading) ? (
          <div>{'Loading...'}</div>
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}
